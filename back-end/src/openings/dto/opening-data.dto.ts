import { ApiProperty } from '@nestjs/swagger';

export class OpeningDataDto {
	@ApiProperty({ required: true })
	day: Date;

	@ApiProperty({ required: true })
	openingHour: number;

	@ApiProperty({ required: true })
	closingHour: number;

	constructor(data: { day: Date; openingHour: number; closingHour: number }) {
		if (data) {
			this.day = data.day;
			this.openingHour = data.openingHour;
			this.closingHour = data.closingHour;
		}
	}
}
