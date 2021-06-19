import { ApiProperty } from '@nestjs/swagger';

export default class UpdateUserResponseDto {
	@ApiProperty({ required: true })
	success: boolean;

	constructor(success = true) {
		this.success = success;
	}
}
