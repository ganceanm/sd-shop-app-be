import {
	Controller,
	Get,
	Post,
	Body,
	UseGuards,
	Req,
	Param,
	Put,
	ParseUUIDPipe,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import CreateUserResponseDto from './dto/create-user.response.dto';
import JwtAuthGuard from 'src/auth/guards/jwt-auth.guard';
import RequestWithUser from 'src/auth/interfaces/requestWithUser.interface';
import { PermissionGuard } from 'src/admin/permission/guard/permission.guard';
import { Target } from 'src/admin/permission/decorators/target.decorator';
import { Operation } from 'src/admin/permission/decorators/permission.decorator';
import { ApiResponse } from '@nestjs/swagger';
import UserDataDto from './dto/user-data.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { configService } from 'src/config/config.service';
import UpdateUserResponseDto from './dto/update-user.response.dto';

@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Get()
	@UseGuards(JwtAuthGuard, PermissionGuard)
	@Target('users')
	@Operation('read')
	async index(
		@Query('page') page = 1,
		@Query('limit') limit = 10,
		@Query('search') search = '',
	): Promise<Pagination<UserDataDto>> {
		limit = Math.max(Math.min(limit, 20), 1);
		return this.usersService.paginate(
			{
				page,
				limit,
				route: configService.getApiUrl('users'),
			},
			search,
		);
	}

	@Get('me')
	@UseGuards(JwtAuthGuard)
	@ApiResponse({ status: 200, type: UserDataDto })
	public async getMe(@Req() req: RequestWithUser): Promise<UserDataDto> {
		return new UserDataDto(req.user);
	}

	@Get(':id')
	@Target('users')
	@Operation('read')
	@ApiResponse({ status: 200, type: UserDataDto })
	public async getById(
		@Param('id', new ParseUUIDPipe()) id: string,
	): Promise<UserDataDto> {
		return new UserDataDto(await this.usersService.getById(id));
	}

	@Post()
	@ApiResponse({ status: 200, type: CreateUserResponseDto })
	public async create(
		@Body() msg: CreateUserDto,
	): Promise<CreateUserResponseDto> {
		return new CreateUserResponseDto(await this.usersService.create(msg));
	}

	@Put(':id')
	@UseGuards(JwtAuthGuard, PermissionGuard)
	@Target('users')
	@Operation('update')
	@ApiResponse({ status: 200, type: UpdateUserResponseDto })
	public async update(
		@Req() request: RequestWithUser,
		@Body() dto: UpdateUserDto,
		@Param('id') id: string,
	): Promise<UpdateUserResponseDto> {
		await this.usersService.update(id, dto, request.user);
		return new UpdateUserResponseDto();
	}
}
