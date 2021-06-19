import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class SetPasswordTokenDto {
	@ApiProperty({ required: false })
	@IsUUID()
	token: string;

	@ApiProperty({ required: false })
	@IsString()
	password: string;

	@ApiProperty({ required: false })
	@IsString()
	confirmPassword: string;
}

export default SetPasswordTokenDto;
