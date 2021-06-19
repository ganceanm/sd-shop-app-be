import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
	@ApiProperty({ required: true })
	@IsString()
	@IsOptional()
	refreshToken: string;
}

export default RefreshTokenDto;
