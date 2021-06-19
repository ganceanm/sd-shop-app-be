import { ApiProperty } from '@nestjs/swagger';

export default class CreateUserResponseDto {
	@ApiProperty({ required: true })
	private id: string;

	constructor(id: string) {
		this.id = id;
	}
}
