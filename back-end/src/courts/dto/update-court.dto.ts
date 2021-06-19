import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

class UpdateCourtDto {
	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	typeId: string;

	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	name: string;

	@ApiProperty({ required: false })
	@IsString()
	@Length(7, 7)
	@IsOptional()
	color: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsNumber()
	hourlyCost: number;
}

export default UpdateCourtDto;
