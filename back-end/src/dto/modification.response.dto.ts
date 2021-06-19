import { ApiProperty } from '@nestjs/swagger';

export class ModificationResponseDto {
	@ApiProperty({ required: true })
	success: boolean;

	constructor(success = true) {
		this.success = success;
	}
}
