// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Body, Controller, Get, Put, Query, UseGuards } from '@nestjs/common';
import { OpeningsService } from './openings.service';
import { UpdateOpeningRuleDataDto } from './dto/update-opening-rule-data.dto';
import { OpeningRuleDataDto } from './dto/opening-rule-data.dto';
import { ModificationResponseDto } from '../dto/modification.response.dto';
import JwtAuthGuard from '../auth/guards/jwt-auth.guard';
import { PermissionGuard } from '../admin/permission/guard/permission.guard';
import { Target } from '../admin/permission/decorators/target.decorator';
import { Operation } from '../admin/permission/decorators/permission.decorator';
import { AppointmentsService } from '../appointments/appointments.service';
import BaseException from '../util/exceptions/base.exception';
import { OpeningDataListDto } from './dto/opening-data-list.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('openings')
export class OpeningsController {
	constructor(private openingsService: OpeningsService) {}

	@Get()
	@ApiResponse({ status: 200, type: OpeningDataListDto })
	async index(
		@Query('date') date = AppointmentsService.getDayByDate(new Date()),
		@Query('days') days = 1,
	): Promise<OpeningDataListDto> {
		const firstDate = new Date(date);
		if (Number.isNaN(firstDate.getTime())) {
			throw new BaseException('400ope03');
		}
		date = AppointmentsService.getDayByDate(firstDate);
		return new OpeningDataListDto({
			list: await this.openingsService.getOpeningByDay(date, days),
		});
	}

	@Get('/rules')
	@UseGuards(JwtAuthGuard, PermissionGuard)
	@Target('admin')
	@Operation('read')
	@ApiResponse({ status: 200, isArray: true, type: OpeningRuleDataDto })
	async getRules(): Promise<OpeningRuleDataDto[]> {
		return await this.openingsService.findAll();
	}

	@Put('/rules')
	@UseGuards(JwtAuthGuard, PermissionGuard)
	@Target('admin')
	@Operation('update')
	async updateRules(
		@Body() dto: UpdateOpeningRuleDataDto,
	): Promise<ModificationResponseDto> {
		await this.openingsService.update(dto);
		return new ModificationResponseDto();
	}
}
