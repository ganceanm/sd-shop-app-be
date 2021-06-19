import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

class UpdateCourtTypeDto {
	@ApiProperty({ required: true })
	@IsString()
	name: string;
}

export default UpdateCourtTypeDto;
