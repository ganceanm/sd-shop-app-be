import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment, Payment, User } from '../entities';
import { Between, In, QueryRunner, Repository } from 'typeorm';
import CreateAppointmentDto from './dto/create-appointment.dto';
import { PaymentsService } from '../payments/payments.service';
import {
	IPaginationOptions,
	paginate,
	Pagination,
} from 'nestjs-typeorm-paginate';
import { AppointmentListDataDto } from './dto/appointment-list-data.dto';
import { AppointmentListDataAdminDto } from './dto/appointment-list-data-admin.dto';
import BaseException from '../util/exceptions/base.exception';
import { Status } from './enum/status.enum';
import { AppointmentTableDataDto } from './dto/appointment-table-data.dto';
import { AppointmentDataDto } from './dto/appointment-data.dto';
import { AppointmentDataAdminDto } from './dto/appointment-data-admin.dto';
import { UsersService } from '../users/users.service';
import { OpeningsService } from '../openings/openings.service';
import { CourtsService } from 'src/courts/courts.service';

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const UTC_OFFSET = 3 * HOUR;

@Injectable()
export class AppointmentsService {
	constructor(
		@InjectRepository(Appointment)
		private readonly repository: Repository<Appointment>,
		private readonly paymentsService: PaymentsService,
		private readonly usersService: UsersService,
		private readonly openingsService: OpeningsService,
		private readonly courtsService: CourtsService,
	) {}

	private async paginate(
		isAdmin: boolean,
		options: IPaginationOptions,
		searchOptions = {},
	): Promise<Pagination<AppointmentListDataDto | AppointmentListDataAdminDto>> {
		const page = await paginate<Appointment>(this.repository, options, {
			order: { createdAt: 'DESC' },
			...searchOptions,
		});
		if (isAdmin) {
			return new Pagination<AppointmentListDataAdminDto>(
				page.items.map((item) => new AppointmentListDataAdminDto(item)),
				page.meta,
				page.links,
			);
		}
		return new Pagination<AppointmentListDataDto>(
			page.items.map((item) => new AppointmentListDataDto(item)),
			page.meta,
			page.links,
		);
	}

	private async findByInterval(
		startTime: Date,
		endTime: Date,
		isAdmin: boolean,
		filters: string[],
	): Promise<AppointmentDataDto[] | AppointmentDataAdminDto[]> {
		const items = await this.repository.find({
			order: { begins: 'ASC' },
			where: {
				begins: Between(startTime, endTime),
				status: In(
					filters.length
						? filters
						: [
								Status.SHOWED,
								Status.PENDING,
								Status.CANCELED,
								Status.DELETED,
								Status.MISSED,
						  ],
				),
			},
		});

		const mapFunc = isAdmin
			? (item) => new AppointmentDataAdminDto(item)
			: (item) => new AppointmentDataDto(item);
		return items.map(mapFunc);
	}

	async findAll(
		from: Date,
		days: number,
		isAdmin: boolean,
		filters: string[],
	): Promise<AppointmentTableDataDto[]> {
		const tmp: AppointmentTableDataDto[] = [];
		from = AppointmentsService.getDayByDate(from);
		for (let i = 0; i < days; i += 1) {
			const startDate = new Date(from.getTime() + i * DAY);
			const endDate = new Date(from.getTime() + (i + 1) * DAY);
			tmp.push({
				date: startDate,
				reserved: await this.findByInterval(
					startDate,
					endDate,
					isAdmin,
					filters,
				),
			});
		}
		return tmp;
	}

	async findByUser(
		options: IPaginationOptions,
		user: User,
		filters: string[],
	): Promise<Pagination<AppointmentListDataDto>> {
		let where;
		if (!filters.length) {
			where = { user };
		} else {
			where = [];
			filters.forEach((item) => {
				where.push({ user, status: item });
			});
		}
		return this.paginate(false, options, { where });
	}

	static getDayByDate(date: Date): Date {
		const tmp = new Date(date);
		tmp.setHours(0);
		tmp.setMinutes(0);
		tmp.setSeconds(0);
		tmp.setMilliseconds(0);
		return tmp;
	}

	static getHourByDate(date: Date): Date {
		const tmp = new Date(date);
		tmp.setMinutes(0);
		tmp.setSeconds(0);
		tmp.setMilliseconds(0);
		return tmp;
	}

	async create(dto: CreateAppointmentDto, user: User): Promise<string> {
		const currentDate = new Date(
			AppointmentsService.getHourByDate(new Date()).getTime() +
				UTC_OFFSET +
				HOUR,
		);
		const begins = AppointmentsService.getHourByDate(new Date(dto.begins));
		if (begins.getTime() <= currentDate.getTime()) {
			throw new BaseException('400apo04');
		}

		const court = await this.courtsService.getById(dto.courtId);

		if (user.credit < court.hourlyCost) {
			throw new BaseException('400pay00');
		}
		const { openingHour, closingHour } = (
			await this.openingsService.getOpeningByDay(
				AppointmentsService.getDayByDate(begins),
			)
		)[0];
		const h = begins.getHours();
		if (h < openingHour || h >= closingHour) {
			throw new BaseException('400apo02');
		}
		const timeWindow = await this.repository.find({ begins });
		if (
			timeWindow.filter(
				(item) =>
					item.status !== Status.CANCELED && item.status !== Status.DELETED,
			).length
		) {
			throw new BaseException('400apo03');
		}
		const afterward = async (queryRunner: QueryRunner, payment: Payment) => {
			const newAppointment = this.repository.create({
				begins,
				user,
				payment,
				court,
				status: Status.PENDING,
			});
			return await queryRunner.manager.save(newAppointment);
		};
		const newAppointment = await this.paymentsService.chargeCredit(
			user,
			-court.hourlyCost,
			afterward,
		);
		return newAppointment.id;
	}

	async createByUserId(
		dto: CreateAppointmentDto,
		userId: string,
	): Promise<string> {
		return this.create(dto, await this.usersService.getById(userId));
	}

	private async deleteById(
		isAdmin: boolean,
		id: string,
		user: User = null,
	): Promise<boolean> {
		const appointment = await this.repository.findOne(
			isAdmin ? { id } : { id, user },
		);
		if (!appointment) {
			throw new BaseException('404apo00', 404);
		}
		if (appointment.status !== Status.PENDING) {
			throw new BaseException('400apo00', 400);
		}
		try {
			const timeDiff = appointment.begins.getTime() - new Date().getTime();
			if (timeDiff <= WEEK) {
				await this.repository.update(
					{ id },
					{ status: isAdmin ? Status.DELETED : Status.CANCELED },
				);
			} else {
				const afterward = async (queryRunner: QueryRunner) => {
					await queryRunner.manager.update(
						Appointment,
						{ id },
						{ status: isAdmin ? Status.DELETED : Status.CANCELED },
					);
				};
				await this.paymentsService.storno(appointment.payment, afterward);
			}
			return true;
		} catch (error) {
			if (error instanceof HttpException) {
				throw error;
			}
			throw new BaseException('500gen00', 500);
		}
	}

	async delete(id: string, user: User): Promise<boolean> {
		return await this.deleteById(false, id, user);
	}

	async deleteAdmin(id: string): Promise<boolean> {
		return await this.deleteById(true, id);
	}
}
