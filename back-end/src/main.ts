import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RedocOptions, RedocModule } from 'nestjs-redoc';
import { AppModule } from './app.module';
import { configService } from './config/config.service';
import corsWrapper from './util/wrappers/cors/cors.wrapper';
import cookieParser from 'cookie-parser';
import { GlobalExceptionFilter } from './util/filters/global-exception.filter';
import { ValidationFilter } from './util/filters/validation.filter';
import { ValidationPipe } from './util/pipes/validation.pipe';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalFilters(new GlobalExceptionFilter(), new ValidationFilter());

	app.useGlobalPipes(ValidationPipe);

	app.use(cookieParser());
	app.use(corsWrapper());

	app.setGlobalPrefix(configService.getGlobalPrefix());

	const options = new DocumentBuilder()
		.setTitle('Squash')
		.setVersion('1.0.0')
		.build();
	const document = SwaggerModule.createDocument(app, options);

	const redocOptions: RedocOptions = {
		title: 'Squash',
		logo: {
			url:
				'https://smartitory.com/wp-content/uploads/2020/03/Smartitory_logo_transparent_small.png',
			backgroundColor: '#F0F0F0',
			altText: 'Smartitory logo',
		},
		sortPropsAlphabetically: true,
		hideDownloadButton: false,
		hideHostname: true,
		expandResponses: 'all',
		requiredPropsFirst: true,
	};

	await RedocModule.setup('/docs', app, document, redocOptions);

	await app.listen(configService.getPort());
}
bootstrap();
