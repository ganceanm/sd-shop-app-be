import { TypeOrmModuleOptions } from '@nestjs/typeorm';

require('dotenv').config();

class ConfigService {
	constructor(private env: { [k: string]: string | undefined }) {}

	private getValue(key: string, throwOnMissing = true): string {
		const value = this.env[key];
		if (!value && throwOnMissing) {
			throw new Error(`config error - missing env.${key}`);
		}

		return value;
	}

	public ensureValues(keys: string[]) {
		keys.forEach((k) => this.getValue(k, true));
		return this;
	}

	public getPort() {
		return this.getValue('PORT', true);
	}

	public getGlobalPrefix() {
		return this.getValue('API_GLOBAL_PREFIX', true);
	}

	public isProduction() {
		const mode = this.getValue('MODE', false);
		return mode != 'DEV';
	}

	public getTypeOrmConfig(): TypeOrmModuleOptions {
		return {
			type: 'postgres',

			host: this.getValue('POSTGRES_HOST'),
			port: parseInt(this.getValue('POSTGRES_PORT')),
			username: this.getValue('POSTGRES_USER'),
			password: this.getValue('POSTGRES_PASSWORD'),
			database: this.getValue('POSTGRES_DATABASE'),

			entities: ['dist/entities/**/*.entity.js'],

			dropSchema: false,
			autoLoadEntities: true,

			migrationsTableName: 'migrations',

			migrations: ['dist/migration/*.js'],

			cli: {
				migrationsDir: 'src/migration',
			},
			migrationsRun: JSON.parse(this.getValue('RUN_MIGRATIONS')),

			ssl: false,
		};
	}

	public getJwtConfig() {
		return {
			jwtSecret: this.getValue('JWT_SECRET'),
			jwtMaxAge: this.getValue('JWT_MAX_AGE'),
			refreshSecret: this.getValue('REFRESH_SECRET'),
			refreshMaxAge: this.getValue('REFRESH_MAX_AGE'),
			issuer: this.getValue('TOKEN_ISSUER'),
			audience: this.getValue('TOKEN_AUDIENCE'),
		};
	}

	public getTargetList(): string[] {
		return ['admin', 'users', 'payments', 'appointments', 'courts'];
	}

	public getBaseUserCredentials() {
		return {
			email: this.getValue('BASE_USERNAME'),
			password: this.getValue('BASE_PASSWORD'),
		};
	}

	getDefaultOpeningHours(name: string) {
		return {
			openingHour: this.getValue(`${name.toUpperCase()}_OPENING`),
			closingHour: this.getValue(`${name.toUpperCase()}_CLOSING`),
		};
	}

	public getSmtpConfig() {
		return {
			domain: this.getValue('SMTP_DOMAIN'),
			user: this.getValue('SMTP_USER'),
			password: this.getValue('SMTP_PASSWORD'),
		};
	}

	public getApiUrl(path = '') {
		return this.getValue('API_URL').concat(path);
	}
}

const configService = new ConfigService(process.env).ensureValues([
	'POSTGRES_HOST',
	'POSTGRES_PORT',
	'POSTGRES_USER',
	'POSTGRES_PASSWORD',
	'POSTGRES_DATABASE',
	'RUN_MIGRATIONS',
	'JWT_SECRET',
	'JWT_MAX_AGE',
	'REFRESH_SECRET',
	'REFRESH_MAX_AGE',
	'TOKEN_ISSUER',
	'TOKEN_AUDIENCE',
	'BASE_USERNAME',
	'BASE_PASSWORD',
	'SMTP_DOMAIN',
	'SMTP_USER',
	'SMTP_PASSWORD',
	'API_URL',
	'API_GLOBAL_PREFIX',
	'WEEKDAY_OPENING',
	'WEEKDAY_CLOSING',
	'WEEKEND_OPENING',
	'WEEKEND_CLOSING',
]);

export { configService, ConfigService };
