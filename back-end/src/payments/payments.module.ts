import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from '../entities';
import { AdminModule } from '../admin/admin.module';
import { UsersModule } from '../users/users.module';

@Module({
	imports: [TypeOrmModule.forFeature([Payment]), AdminModule, UsersModule],
	providers: [PaymentsService],
	controllers: [PaymentsController],
	exports: [PaymentsService],
})
export class PaymentsModule {}
