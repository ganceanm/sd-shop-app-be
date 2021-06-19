import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
	@ApiProperty({ required: false })
	@IsEmail()
	email: string;

	@ApiProperty({ required: false })
	@IsString()
	password: string;
}

export default LoginDto;
