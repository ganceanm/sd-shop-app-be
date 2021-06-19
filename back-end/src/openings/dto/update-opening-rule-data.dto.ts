import { ApiProperty } from '@nestjs/swagger';
import { UpdateOpeningRuleDto } from './update-opening-rule.dto';
import { CreateOpeningRuleDto } from './create-opening-rule.dto';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { DeleteOpeningRuleDto } from './delete-opening-rule.dto';

export class UpdateOpeningRuleDataDto {
	@ApiProperty({ required: false, isArray: true, type: CreateOpeningRuleDto })
	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CreateOpeningRuleDto)
	create: CreateOpeningRuleDto[];

	@ApiProperty({ required: false, isArray: true, type: UpdateOpeningRuleDto })
	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => UpdateOpeningRuleDto)
	update: UpdateOpeningRuleDto[];

	@ApiProperty({ required: false, isArray: true, type: DeleteOpeningRuleDto })
	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => DeleteOpeningRuleDto)
	delete: DeleteOpeningRuleDto[];
}
