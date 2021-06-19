import { ValidationPipe as NestValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ValidationException } from '../exceptions/validation.exception';

export const ValidationPipe = new NestValidationPipe({
	transform: true,
	whitelist: true,
	forbidNonWhitelisted: true,
	forbidUnknownValues: true,
	exceptionFactory: (errors: ValidationError[]): ValidationException => {
		return new ValidationException(errors);
	},
});
