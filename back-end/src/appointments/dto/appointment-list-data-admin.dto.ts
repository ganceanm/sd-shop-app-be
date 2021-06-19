import { ApiProperty } from '@nestjs/swagger';
import { Appointment } from '../../entities';
import { AppointmentListDataDto } from './appointment-list-data.dto';
import UserDataDto from '../../users/dto/user-data.dto';

export class AppointmentListDataAdminDto extends AppointmentListDataDto {
	@ApiProperty({ required: true })
	user: UserDataDto;

	constructor(data: Appointment) {
		if (data) {
			super(data);
			this.user = new UserDataDto(data.user);
		}
	}
}
