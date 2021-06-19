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
import { PaymentsService } from './payments.service';
import JwtAuthGuard from '../auth/guards/jwt-auth.guard';
import { PermissionGuard } from '../admin/permission/guard/permission.guard';
import { Target } from '../admin/permission/decorators/target.decorator';
import { Operation } from '../admin/permission/decorators/permission.decorator';
import CreatePaymentDto from './dto/create-payment.dto';
import CreatePaymentResponseDto from './dto/create-payment.response.dto';
import DeletePaymentResponseDto from './dto/delete-payment.response.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { PaymentDataDto } from './dto/payment-data.dto';
import { configService } from '../config/config.service';
import RequestWithUser from '../auth/interfaces/requestWithUser.interface';

@Controller('payments')
export class PaymentsController {
	constructor(private paymentsService: PaymentsService) {}

	@Get()
	@UseGuards(JwtAuthGuard, PermissionGuard)
	@Target('payments')
	@Operation('read')
	async index(
		@Query('page') page = 1,
		@Query('limit') limit = 15,
	): Promise<Pagination<PaymentDataDto>> {
		limit = Math.min(limit, 20);
		return this.paymentsService.findAll({
			page,
			limit,
			route: configService.getApiUrl('payments'),
		});
	}

	@Get('me')
	@UseGuards(JwtAuthGuard)
	async getMe(
		@Query('page') page = 1,
		@Query('limit') limit = 15,
		@Req() req: RequestWithUser,
	): Promise<Pagination<PaymentDataDto>> {
		limit = Math.min(limit, 20);
		return this.paymentsService.findByUser(
			{
				page,
				limit,
				route: configService.getApiUrl('payments/me'),
			},
			req.user,
		);
	}

	@Post(':id')
	@UseGuards(JwtAuthGuard, PermissionGuard)
	@Target('payments')
	@Operation('create')
	async create(
		@Body() dto: CreatePaymentDto,
		@Param('id', new ParseUUIDPipe()) id: string,
	): Promise<CreatePaymentResponseDto> {
		const response = new CreatePaymentResponseDto();
		response.id = await this.paymentsService.addCredit(id, dto.value);
		return response;
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard, PermissionGuard)
	@Target('payments')
	@Operation('delete')
	async delete(
		@Param('id', new ParseUUIDPipe()) id: string,
	): Promise<DeletePaymentResponseDto> {
		return new DeletePaymentResponseDto(await this.paymentsService.delete(id));
	}
}
