import { ApiProperty } from '@nestjs/swagger';
import { CourtType } from 'src/entities/court/court-type.entity';
import { CourtTypeDto } from './court-type.dto';

class CourtTypeListDto {
	@ApiProperty({ required: false })
	items: CourtTypeDto[];

	constructor(data: CourtType[]) {
		if (data) {
			this.items = data.map((item) => new CourtTypeDto(item));
		}
	}
}

export default CourtTypeListDto;
