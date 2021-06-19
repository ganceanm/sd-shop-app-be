import { HttpException } from '@nestjs/common';

export default class BaseException extends HttpException {
	constructor(private _code: string, status = 400) {
		super(_code, status);
	}

	get code(): string {
		return this._code;
	}
}
