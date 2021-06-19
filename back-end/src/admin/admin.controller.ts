import {
	Controller,
	Get,
	Post,
	UseGuards,
	Body,
	Put,
	Param,
	Delete,
	ParseUUIDPipe,
} from '@nestjs/common';
import { RolesService } from 'src/admin/roles/roles.service';
import { PermissionService } from 'src/admin/permission/permission.service';
import { RolesDto } from './dto/roles.dto';
import { RoleDto } from './dto/role.dto';
import JwtAuthGuard from 'src/auth/guards/jwt-auth.guard';
import { CreationResponseDto } from 'src/dto/creation.response.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { PermissionsDto } from './dto/permissions.dto';
import { PermissionDto } from './dto/permission.dto';
import { Target } from 'src/admin/permission/decorators/target.decorator';
import { Operation } from 'src/admin/permission/decorators/permission.decorator';
import { PermissionGuard } from 'src/admin/permission/guard/permission.guard';
import { ModificationResponseDto } from 'src/dto/modification.response.dto';
import { ApiResponse } from '@nestjs/swagger';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Controller('admin')
@UseGuards(JwtAuthGuard, PermissionGuard)
export class AdminController {
	constructor(
		private readonly rolesService: RolesService,
		private readonly permissionService: PermissionService,
	) {}

	@Get('roles')
	@Target('admin')
	@Operation('read')
	@ApiResponse({ status: 200, type: RolesDto })
	public async getRoles(): Promise<RolesDto> {
		const results = await this.rolesService.getRoles();
		const roles = [];

		results.forEach((item) => {
			roles.push(new RoleDto(item));
		});

		const response = new RolesDto();
		response.results = roles;
		return response;
	}

	@Post('role')
	@Target('admin')
	@Operation('create')
	@ApiResponse({ status: 200, type: CreationResponseDto })
	public async createRole(
		@Body() data: CreateRoleDto,
	): Promise<CreationResponseDto> {
		const created = await this.rolesService.createRole(
			data.name,
			data.description,
		);

		return new CreationResponseDto(created);
	}

	@Get('permissions')
	@Target('admin')
	@Operation('read')
	@ApiResponse({ status: 200, type: PermissionsDto })
	public async getPermissions(): Promise<PermissionsDto> {
		const results = await this.permissionService.getAll();
		const perms = [];

		results.forEach((item) => {
			perms.push(new PermissionDto(item));
		});

		const response = new PermissionsDto();
		response.results = perms;
		return response;
	}

	@Put('permission/:id')
	@Target('admin')
	@Operation('update')
	@ApiResponse({ status: 200, type: ModificationResponseDto })
	public async update(
		@Body() msg: UpdatePermissionDto,
		@Param('id', new ParseUUIDPipe()) id: string,
	): Promise<ModificationResponseDto> {
		return new ModificationResponseDto(
			await this.permissionService.update(id, msg),
		);
	}

	@Delete('permission/:id')
	@Target('admin')
	@Operation('delete')
	@ApiResponse({ status: 200, type: ModificationResponseDto })
	public async delete(
		@Param('id', new ParseUUIDPipe()) id: string,
	): Promise<ModificationResponseDto> {
		return new ModificationResponseDto(await this.permissionService.delete(id));
	}
}
