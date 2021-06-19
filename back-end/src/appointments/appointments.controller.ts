import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseUUIDPipe,
	Post,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	Query,
	Req,
	UseGuards,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import JwtAuthGuard from '../auth/guards/jwt-auth.guard';
import CreateAppointmentDto from './dto/create-appointment.dto';
import RequestWithUser from '../auth/interfaces/requestWithUser.interface';
import { PermissionGuard } from '../admin/permission/guard/permission.guard';
import { Target } from '../admin/permission/decorators/target.decorator';
import { Operation } from '../admin/permission/decorators/permission.decorator';
import { Pagination } from 'nestjs-typeorm-paginate';
import { AppointmentDataDto } from './dto/appointment-data.dto';
import { configService } from '../config/config.service';
import DeleteAppointmentResponseDto from './dto/delete-appointment.response.dto';
import AppointmentTableDataResponseDto from './dto/appointment-table-data.response.dto';
import { Status } from './enum/status.enum';
import BaseException from '../util/exceptions/base.exception';
import { CreationResponseDto } from '../dto/creation.response.dto';

@Controller('appointments')
export class AppointmentsController {
	constructor(private readonly appointmentsService: AppointmentsService) {}

	private static validateFilters(filters: string): string[] {
		if (filters) {
			const tmp = filters.split(',');
			tmp.forEach((item) => {
				if (!Status[item]) {
					throw new BaseException('400apo01');
				}
			});
			return tmp;
		}
		return [];
	}

	@Get()
	async index(
		@Query('from') from = AppointmentsService.getDayByDate(new Date()),
		@Query('days') days = 1,
		@Query('status') filters: string = null,
	): Promise<AppointmentTableDataResponseDto> {
		return new AppointmentTableDataResponseDto(
			await this.appointmentsService.findAll(
				new Date(from),
				Math.max(Number(days), 1),
				false,
				AppointmentsController.validateFilters(filters),
			),
		);
	}

	@Get('/admin')
	@UseGuards(JwtAuthGuard, PermissionGuard)
	@Target('appointments')
	@Operation('read')
	async indexAdmin(
		@Query('from') from = AppointmentsService.getDayByDate(new Date()),
		@Query('days') days = 1,
		@Query('status') filters: string = null,
	): Promise<AppointmentTableDataResponseDto> {
		days = Math.max(days, 1);
		from = new Date(from);
		return new AppointmentTableDataResponseDto(
			await this.appointmentsService.findAll(
				from,
				days,
				true,
				AppointmentsController.validateFilters(filters),
			),
		);
	}

	@Get('/mine')
	@UseGuards(JwtAuthGuard)
	async getMine(
		@Query('page') page = 1,
		@Query('limit') limit = 10,
		@Req() req: RequestWithUser,
		@Query('status') filters: string = null,
	): Promise<Pagination<AppointmentDataDto>> {
		limit = Math.min(limit, 20);
		return this.appointmentsService.findByUser(
			{
				page,
				limit,
				route: configService.getApiUrl('appointments/mine'),
			},
			req.user,
			AppointmentsController.validateFilters(filters),
		);
	}

	@Post()
	@UseGuards(JwtAuthGuard)
	async create(
		@Req() req: RequestWithUser,
		@Body() dto: CreateAppointmentDto,
	): Promise<CreationResponseDto> {
		return new CreationResponseDto(
			await this.appointmentsService.create(dto, req.user),
		);
	}

	@Post(':id')
	@UseGuards(JwtAuthGuard, PermissionGuard)
	@Target('appointments')
	@Operation('create')
	async createByUserId(
		@Param('id', new ParseUUIDPipe()) id: string,
		@Body() dto: CreateAppointmentDto,
	): Promise<CreationResponseDto> {
		return new CreationResponseDto(
			await this.appointmentsService.createByUserId(dto, id),
		);
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async delete(
		@Param('id', new ParseUUIDPipe()) id: string,
		@Req() req: RequestWithUser,
	): Promise<DeleteAppointmentResponseDto> {
		await this.appointmentsService.delete(id, req.user);
		return new DeleteAppointmentResponseDto();
	}

	@Delete(':/id/admin')
	@UseGuards(JwtAuthGuard, PermissionGuard)
	@Target('appointments')
	@Operation('delete')
	async deleteAdmin(
		@Param('id', new ParseUUIDPipe()) id: string,
	): Promise<DeleteAppointmentResponseDto> {
		await this.appointmentsService.deleteAdmin(id);
		return new DeleteAppointmentResponseDto();
	}
}
