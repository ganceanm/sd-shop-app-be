import { ApiProperty } from '@nestjs/swagger';
import { Permission } from 'src/entities';

export class PermissionDto {
	@ApiProperty()
	id: string;

	@ApiProperty({ description: 'Role ID' })
	role: string;

	@ApiProperty()
	target: string;
	@ApiProperty()
	create: boolean;
	@ApiProperty()
	read: boolean;
	@ApiProperty()
	update: boolean;
	@ApiProperty()
	delete: boolean;

	constructor(permission: Permission) {
		this.id = permission.id;
		this.role = permission.role.id;
		this.target = permission.target;
		this.create = permission.create;
		this.read = permission.read;
		this.update = permission.update;
		this.delete = permission.delete;
	}
}
