import { ApiProperty } from '@nestjs/swagger';
import { Court } from 'src/entities/court/court.entity';
import CourtDto from './court.dto';

class CourtListDto {
	@ApiProperty({ required: false })
	items: CourtDto[];

	constructor(data: Court[]) {
		if (data) {
			this.items = data.map((item) => new CourtDto(item));
		}
	}
}

export default CourtListDto;
