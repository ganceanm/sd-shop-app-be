import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length } from 'class-validator';

class CreateCourtDto {
	@ApiProperty({ required: true })
	@IsString()
	typeId: string;

	@ApiProperty({ required: true })
	@IsString()
	name: string;

	@ApiProperty({ required: true })
	@IsString()
	@Length(7, 7)
	color: string;

	@ApiProperty({ required: true })
	@IsNumber()
	hourlyCost: number;
}

export default CreateCourtDto;
