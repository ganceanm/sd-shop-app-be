import { ApiProperty } from '@nestjs/swagger';
import { AppointmentTableDataDto } from './appointment-table-data.dto';

export default class AppointmentTableDataResponseDto {
	@ApiProperty({ required: true })
	list: AppointmentTableDataDto[];

	constructor(list: AppointmentTableDataDto[]) {
		this.list = list;
	}
}
