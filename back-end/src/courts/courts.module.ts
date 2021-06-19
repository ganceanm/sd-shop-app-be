import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from 'src/admin/admin.module';
import { CourtType } from 'src/entities/court/court-type.entity';
import { Court } from 'src/entities/court/court.entity';
import { CourtsController } from './courts.controller';
import { CourtsService } from './courts.service';
import { TypesService } from './types/types.service';

@Module({
	imports: [TypeOrmModule.forFeature([Court, CourtType]), AdminModule],
	controllers: [CourtsController],
	providers: [CourtsService, TypesService],
	exports: [CourtsService],
})
export class CourtsModule {}
