import { RoleDto } from './role.dto';
import { ApiProperty } from '@nestjs/swagger';

export class RolesDto {
	@ApiProperty({ type: RoleDto, required: false })
	results: RoleDto[];
}
