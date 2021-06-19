import { HttpStatus, HttpException } from '@nestjs/common';

export class AuthenticationFailedException extends HttpException {
	code: string;

	constructor(code: string) {
		super('401', HttpStatus.UNAUTHORIZED);
		this.code = code;
	}
}
