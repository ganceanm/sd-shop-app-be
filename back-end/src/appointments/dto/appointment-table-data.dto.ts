import { ApiProperty } from '@nestjs/swagger';
import { AppointmentDataDto } from './appointment-data.dto';
import { AppointmentDataAdminDto } from './appointment-data-admin.dto';

export class AppointmentTableDataDto {
	@ApiProperty({ required: true })
	date: Date;

	@ApiProperty({ required: true })
	reserved: AppointmentDataDto[] | AppointmentDataAdminDto[];

	constructor(
		date: Date,
		reserved: AppointmentDataDto[] | AppointmentDataAdminDto[],
	) {
		this.date = date;
		this.reserved = reserved;
	}
}
