import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
	constructor(private readonly mailerService: MailerService) {}

	public sendPasswordReset(
		address: string,
		userName: string,
		resetToken: string,
	): void {
		this.mailerService
			.sendMail({
				to: address,
				subject: 'Reset yout password',
				template: 'reset-password',
				context: {
					token: resetToken,
					name: userName,
				},
			})
			.then(console.log)
			.catch(console.error);
	}
}
