import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ResetPasswordDto {
	@ApiProperty({ required: false })
	@IsEmail()
	email: string;
}

export default ResetPasswordDto;
