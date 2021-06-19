import { ApiProperty } from '@nestjs/swagger';
import { Appointment } from '../../entities';
import { AppointmentDataDto } from './appointment-data.dto';

export class AppointmentListDataDto extends AppointmentDataDto {
	@ApiProperty({ required: true })
	createdAt: Date;

	constructor(data: Appointment) {
		if (data) {
			super(data);
			this.createdAt = data.createdAt;
		}
	}
}
