import { Module } from '@nestjs/common';
import { OpeningsController } from './openings.controller';
import { OpeningsService } from './openings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Opening } from '../entities';
import { AdminModule } from '../admin/admin.module';

@Module({
	imports: [TypeOrmModule.forFeature([Opening]), AdminModule],
	controllers: [OpeningsController],
	providers: [OpeningsService],
	exports: [OpeningsService],
})
export class OpeningsModule {}
