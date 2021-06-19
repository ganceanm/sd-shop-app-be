import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import UpdateProfileDto from './update-profile.dto';

export class UpdateUserDto {
	@ApiProperty({ required: true })
	@ValidateNested({ each: true })
	@Type(() => UpdateProfileDto)
	profile: UpdateProfileDto;
}

export default UpdateUserDto;
