import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsPhoneNumber, IsOptional } from 'class-validator';

export class UpdateProfileDto {
	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	firstName: string;

	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	lastName: string;

	@ApiProperty({ required: false })
	@IsPhoneNumber()
	@IsOptional()
	phone: string;
}

export default UpdateProfileDto;
