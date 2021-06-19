import { Module } from '@nestjs/common';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from '../entities';
import { PaymentsModule } from '../payments/payments.module';
import { UsersModule } from '../users/users.module';
import { AdminModule } from '../admin/admin.module';
import { OpeningsModule } from '../openings/openings.module';
import { CourtsModule } from 'src/courts/courts.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Appointment]),
		PaymentsModule,
		UsersModule,
		AdminModule,
		OpeningsModule,
		CourtsModule,
	],
	controllers: [AppointmentsController],
	providers: [AppointmentsService],
	exports: [AppointmentsService],
})
export class AppointmentsModule {}
