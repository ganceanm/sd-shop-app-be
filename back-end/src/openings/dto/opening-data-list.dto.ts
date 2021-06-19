import { ApiProperty } from '@nestjs/swagger';
import { OpeningDataDto } from './opening-data.dto';

export class OpeningDataListDto {
	@ApiProperty({ required: true, isArray: true, type: OpeningDataDto })
	list: OpeningDataDto[];

	constructor(data: { list: OpeningDataDto[] }) {
		if (data) {
			this.list = data.list;
		}
	}
}
