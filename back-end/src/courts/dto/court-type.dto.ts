import { ApiProperty } from '@nestjs/swagger';
import { CourtType } from 'src/entities/court/court-type.entity';

export class CourtTypeDto {
	@ApiProperty()
	id: string;

	@ApiProperty()
	name: string;

	constructor(data: CourtType) {
		if (data) {
			this.id = data.id;
			this.name = data.name;
		}
	}
}
