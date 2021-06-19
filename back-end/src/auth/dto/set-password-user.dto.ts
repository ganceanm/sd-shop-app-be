import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SetPasswordUserDto {
	@ApiProperty({ required: false })
	@IsString()
	password: string;

	@ApiProperty({ required: false })
	@IsString()
	confirmPassword: string;
}

export default SetPasswordUserDto;
