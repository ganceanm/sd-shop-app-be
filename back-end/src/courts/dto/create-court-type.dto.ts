import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

class CreateCourtTypeDto {
	@ApiProperty({ required: true })
	@IsString()
	name: string;
}

export default CreateCourtTypeDto;
