import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment, User } from '../entities';
import { getConnection, QueryRunner, Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { PaymentType } from './enum/payment-type.enum';
import {
	IPaginationOptions,
	paginate,
	Pagination,
} from 'nestjs-typeorm-paginate';
import { PaymentDataDto } from './dto/payment-data.dto';
import BaseException from '../util/exceptions/base.exception';

interface transactionItem {
	(queryRunner: QueryRunner, payment: Payment): Promise<any>;
}

@Injectable()
export class PaymentsService {
	constructor(
		@InjectRepository(Payment)
		private readonly repository: Repository<Payment>,
		private readonly usersService: UsersService,
	) {}

	private async paginate(
		options: IPaginationOptions,
		searchOptions = {},
	): Promise<Pagination<PaymentDataDto>> {
		const page = await paginate<Payment>(this.repository, options, {
			order: { createdAt: 'DESC' },
			...searchOptions,
		});
		const items = page.items.map((item) => new PaymentDataDto(item));
		return new Pagination<PaymentDataDto>(items, page.meta, page.links);
	}

	async findAll(
		options: IPaginationOptions,
	): Promise<Pagination<PaymentDataDto>> {
		return this.paginate(options);
	}

	async findByUser(
		options: IPaginationOptions,
		user: User,
	): Promise<Pagination<PaymentDataDto>> {
		return this.paginate(options, { where: { user } });
	}

	async updateCredits(user: User, queryRunner: QueryRunner): Promise<number> {
		let { sum } = await queryRunner.manager
			.createQueryBuilder()
			.select('SUM(payment.value)', 'sum')
			.from(Payment, 'payment')
			.where('payment.userId = :userId', { userId: user.id })
			.getRawOne();
		sum = !sum ? 0 : Number.parseInt(sum, 10);
		await queryRunner.manager.update(User, { id: user.id }, { credit: sum });
		return sum;
	}

	async create(
		user: User,
		value: number,
		type: PaymentType,
		afterward: transactionItem | transactionItem[] = null,
	): Promise<Payment> {
		const queryRunner = getConnection().createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction('SERIALIZABLE');
		try {
			const finalize = async () => {
				await this.updateCredits(user, queryRunner);
				await queryRunner.commitTransaction();
			};
			const newPayment = await this.repository.create({ value, user, type });
			await queryRunner.manager.save(newPayment);
			if (afterward) {
				if (Array.isArray(afterward)) {
					let ret = newPayment;
					for (let i = 0; i < afterward.length; i += 1) {
						if (afterward[i]) {
							const tmp = await afterward[i](queryRunner, newPayment);
							if (tmp) {
								ret = tmp;
							}
						}
					}
					await finalize();
					return ret;
				}
				const aft = await afterward(queryRunner, newPayment);
				await finalize();
				return aft ? aft : newPayment;
			}
			await finalize();
			return newPayment;
		} catch (err) {
			await queryRunner.rollbackTransaction();
			throw err;
		} finally {
			await queryRunner.release();
		}
	}

	async addCredit(userId: string, value: number): Promise<string> {
		const user = await this.usersService.getById(userId);
		const newPayment = await this.create(user, value, PaymentType.TOP_UP);
		return newPayment.id;
	}

	async chargeCredit(
		user: User,
		value: number,
		afterward = null,
	): Promise<Payment> {
		return await this.create(user, value, PaymentType.CHARGE, afterward);
	}

	async storno(
		payment: Payment,
		afterward: transactionItem = null,
	): Promise<string> {
		if (payment.type === PaymentType.STORNO) {
			throw new BaseException('400pay02');
		}
		if (!payment.isRevertible) {
			throw new BaseException('400pay01');
		}
		const revoke = async (queryRunner: QueryRunner) => {
			await queryRunner.manager.update(
				Payment,
				{ id: payment.id },
				{ isRevertible: false },
			);
		};
		const newPayment = await this.create(
			payment.user,
			-payment.value,
			PaymentType.STORNO,
			[revoke, afterward],
		);
		return newPayment.id;
	}

	async delete(id: string): Promise<string> {
		const payment = await this.repository.findOne({ id });
		if (!payment) {
			throw new BaseException('404pay00', 404);
		}
		return await this.storno(payment);
	}
}
