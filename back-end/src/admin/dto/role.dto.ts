import { Role } from 'src/entities';
import { ApiProperty } from '@nestjs/swagger';

export class RoleDto {
	@ApiProperty()
	id: string;
	@ApiProperty()
	name: string;
	@ApiProperty()
	description: string;

	constructor(role: Role) {
		this.id = role.id;
		this.name = role.name;
		this.description = role.description;
	}
}
