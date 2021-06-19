import { ApiProperty } from '@nestjs/swagger';

export class CreationResponseDto {
	@ApiProperty({ required: false })
	id: string;

	constructor(id: string) {
		this.id = id;
	}
}
