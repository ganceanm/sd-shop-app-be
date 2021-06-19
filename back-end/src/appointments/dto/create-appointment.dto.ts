import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

class CreateAppointmentDto {
	@ApiProperty({ required: true })
	@IsDateString()
	begins: Date;

	@ApiProperty({ required: true })
	@IsString()
	courtId: string;
}

export default CreateAppointmentDto;
