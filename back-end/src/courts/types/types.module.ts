import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourtType } from 'src/entities/court/court-type.entity';
import { TypesService } from './types.service';

@Module({
	imports: [TypeOrmModule.forFeature([CourtType])],
	providers: [TypesService],
	exports: [TypesService],
})
export class TypesModule {}
