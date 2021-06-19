import { ApiProperty } from '@nestjs/swagger';
import { Opening } from '../../entities';

export class OpeningRuleDataDto {
	@ApiProperty({ required: true })
	id: string;

	@ApiProperty({ required: true })
	isDefault: boolean;

	@ApiProperty({ required: true })
	name: string;

	@ApiProperty({ required: false })
	rule: string;

	@ApiProperty({ required: false })
	order: number;

	@ApiProperty({ required: true })
	openingHour: number;

	@ApiProperty({ required: true })
	closingHour: number;

	constructor(data: Opening) {
		if (data) {
			this.id = data.id;
			this.isDefault = data.isDefault;
			this.name = data.name;
			this.openingHour = data.openingHour;
			this.closingHour = data.closingHour;
			if (!data.isDefault) {
				this.rule = data.rule;
				this.order = data.order;
			}
		}
	}
}
