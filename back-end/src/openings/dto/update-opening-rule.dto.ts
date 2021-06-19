import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateOpeningRuleDto {
	@ApiProperty({ required: true })
	@IsUUID()
	id: string;

	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	name: string;

	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	rule: string;

	@ApiProperty({ required: false })
	@IsInt()
	@IsOptional()
	order: number;

	@ApiProperty({ required: false })
	@IsInt()
	@IsOptional()
	openingHour: number;

	@ApiProperty({ required: false })
	@IsInt()
	@IsOptional()
	closingHour: number;
}
