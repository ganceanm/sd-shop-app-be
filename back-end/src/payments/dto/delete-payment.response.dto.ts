import { ApiProperty } from '@nestjs/swagger';

export default class DeletePaymentResponseDto {
	@ApiProperty({ required: true })
	id: string;

	constructor(id: string) {
		this.id = id;
	}
}
