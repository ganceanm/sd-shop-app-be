import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from 'src/entities';
import { ProfileModule } from './profile/profile.module';
import { AdminModule } from 'src/admin/admin.module';
import { MailModule } from 'src/util/mail/mail.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		AdminModule,
		ProfileModule,
		MailModule,
	],
	providers: [UsersService],
	controllers: [UsersController],
	exports: [UsersService],
})
export class UsersModule {}
