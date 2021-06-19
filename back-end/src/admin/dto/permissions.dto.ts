import { ApiProperty } from '@nestjs/swagger';
import { PermissionDto } from './permission.dto';

export class PermissionsDto {
	@ApiProperty({ type: PermissionDto, required: false })
	results: PermissionDto[];
}
