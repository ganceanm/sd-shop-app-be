import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './guards/local.strategy';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { configService } from 'src/config/config.service';
import { JwtStrategy } from './guards/jwt.strategy';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';

@Module({
	imports: [
		UsersModule,
		JwtModule.registerAsync({
			useFactory: async () => ({
				secret: configService.getJwtConfig().jwtSecret,
				signOptions: {
					audience: `${configService.getJwtConfig().audience}`,
					issuer: `${configService.getJwtConfig().issuer}`,
				},
			}),
		}),
		RefreshTokenModule,
	],
	controllers: [AuthController],
	providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
