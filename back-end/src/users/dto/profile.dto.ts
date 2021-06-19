import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsPhoneNumber } from 'class-validator';
import { Profile } from '../../entities';

export class ProfileDto {
	@ApiProperty({ required: false })
	@IsString()
	firstName: string;

	@ApiProperty({ required: false })
	@IsString()
	lastName: string;

	@ApiProperty({ required: true })
	@IsPhoneNumber('RO')
	phone: string;

	constructor(data: Profile) {
		if (data) {
			this.firstName = data.firstName;
			this.lastName = data.lastName;
			this.phone = data.phone;
		}
	}
}

export default ProfileDto;
