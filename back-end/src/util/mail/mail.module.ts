import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { configService } from 'src/config/config.service';

@Module({
	imports: [
		MailerModule.forRoot({
			transport:
				'smtps://' +
				configService.getSmtpConfig().user +
				'@' +
				configService.getSmtpConfig().domain +
				':' +
				configService.getSmtpConfig().password +
				'@mail.' +
				configService.getSmtpConfig().domain,
			defaults: {
				from: '"noreply" <noreply@webframe.com>',
			},
			template: {
				dir: __dirname + '/templates',
				adapter: new PugAdapter(),
				options: {
					strict: true,
				},
			},
		}),
	],
	providers: [MailService],
	exports: [MailService],
})
export class MailModule {}
