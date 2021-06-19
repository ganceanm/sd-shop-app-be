import { ApiProperty } from '@nestjs/swagger';
import { Court } from 'src/entities/court/court.entity';
import { CourtTypeDto } from './court-type.dto';

class CourtDto {
	@ApiProperty({ required: false })
	id: string;

	@ApiProperty({ required: false })
	type: CourtTypeDto;

	@ApiProperty({ required: false })
	name: string;

	@ApiProperty({ required: false })
	color: string;

	@ApiProperty({ required: false })
	hourlyCost: number;

	constructor(data: Court) {
		if (data) {
			this.id = data.id;
			this.type = new CourtTypeDto(data.type);
			this.name = data.name;
			this.color = data.color;
			this.hourlyCost = data.hourlyCost;
		}
	}
}

export default CourtDto;
