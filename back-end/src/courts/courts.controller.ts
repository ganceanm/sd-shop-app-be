import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseUUIDPipe,
	Post,
	Put,
	Req,
	UseGuards,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Operation } from 'src/admin/permission/decorators/permission.decorator';
import { Target } from 'src/admin/permission/decorators/target.decorator';
import { PermissionGuard } from 'src/admin/permission/guard/permission.guard';
import JwtAuthGuard from 'src/auth/guards/jwt-auth.guard';
import RequestWithUser from 'src/auth/interfaces/requestWithUser.interface';
import { CreationResponseDto } from 'src/dto/creation.response.dto';
import { ModificationResponseDto } from 'src/dto/modification.response.dto';
import { CourtsService } from './courts.service';
import CourtListDto from './dto/court-list.dto';
import CourtTypeListDto from './dto/court-type-list.dto';
import { CourtTypeDto } from './dto/court-type.dto';
import CreateCourtTypeDto from './dto/create-court-type.dto';
import CreateCourtDto from './dto/create-court.dto';
import UpdateCourtTypeDto from './dto/update-court-type.dto';
import UpdateCourtDto from './dto/update-court.dto';

@Controller('courts')
export class CourtsController {
	constructor(private readonly courtsService: CourtsService) {}

	@Get('types')
	@ApiResponse({ status: 200, type: CourtTypeListDto })
	public async getCourtTypes(): Promise<CourtTypeListDto> {
		return await this.courtsService.getTypes();
	}

	@Post('types')
	@Target('courts')
	@Operation('create')
	@UseGuards(JwtAuthGuard, PermissionGuard)
	@ApiResponse({ status: 200, type: CourtTypeDto })
	public async createCourtType(
		@Body() dto: CreateCourtTypeDto,
	): Promise<CourtTypeDto> {
		return await this.courtsService.createType(dto);
	}

	@Put('types/:id')
	@Target('courts')
	@Operation('update')
	@ApiResponse({ status: 200, type: ModificationResponseDto })
	public async updateCourtType(
		@Body() dto: UpdateCourtTypeDto,
		@Param('id', new ParseUUIDPipe()) id: string,
	): Promise<ModificationResponseDto> {
		return await this.courtsService.updateType(id, dto);
	}

	@Get()
	@ApiResponse({ status: 200, type: CourtListDto })
	public async getRoles(): Promise<CourtListDto> {
		return await this.courtsService.get();
	}

	@Post()
	@Target('courts')
	@Operation('create')
	@UseGuards(JwtAuthGuard, PermissionGuard)
	@ApiResponse({ status: 200, type: CreationResponseDto })
	public async createCourt(
		@Body() dto: CreateCourtDto,
		@Req() req: RequestWithUser,
	): Promise<CreationResponseDto> {
		return await this.courtsService.create(dto, req.user);
	}

	@Put(':id')
	@Target('courts')
	@Operation('update')
	@UseGuards(JwtAuthGuard, PermissionGuard)
	@ApiResponse({ status: 200, type: ModificationResponseDto })
	public async updateCourt(
		@Param('id', new ParseUUIDPipe()) id: string,
		@Body() dto: UpdateCourtDto,
		@Req() req: RequestWithUser,
	): Promise<ModificationResponseDto> {
		return await this.courtsService.update(id, dto, req.user);
	}

	@Delete(':id')
	@Target('courts')
	@Operation('delete')
	@UseGuards(JwtAuthGuard, PermissionGuard)
	@ApiResponse({ status: 200, type: ModificationResponseDto })
	public async deleteCourt(
		@Param('id', new ParseUUIDPipe()) id: string,
		@Req() req: RequestWithUser,
	): Promise<ModificationResponseDto> {
		return await this.courtsService.delete(id, req.user);
	}
}
