import { ApiProperty } from '@nestjs/swagger';
import CourtDto from 'src/courts/dto/court.dto';
import { Appointment } from '../../entities';

export class AppointmentDataDto {
	@ApiProperty({ required: true })
	id: string;

	@ApiProperty({ required: true })
	begins: Date;

	@ApiProperty({ required: true })
	court: CourtDto;

	constructor(data: Appointment) {
		if (data) {
			this.id = data.id;
			this.begins = data.begins;
			this.court = new CourtDto(data.court);
		}
	}
}
