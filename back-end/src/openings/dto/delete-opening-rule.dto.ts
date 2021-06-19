import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class DeleteOpeningRuleDto {
	@ApiProperty({ required: true })
	@IsUUID()
	id: string;
}
