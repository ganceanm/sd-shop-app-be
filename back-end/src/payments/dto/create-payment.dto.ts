import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

class CreatePaymentDto {
	@ApiProperty({ required: true })
	@IsNumber()
	value: number;
}

export default CreatePaymentDto;
