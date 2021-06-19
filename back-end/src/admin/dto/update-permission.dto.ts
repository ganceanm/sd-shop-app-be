import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdatePermissionDto {
	@ApiProperty({ required: false })
	@IsBoolean()
	create: boolean;

	@ApiProperty({ required: false })
	@IsBoolean()
	read: boolean;

	@ApiProperty({ required: false })
	@IsBoolean()
	update: boolean;

	@ApiProperty({ required: false })
	@IsBoolean()
	delete: boolean;
}
