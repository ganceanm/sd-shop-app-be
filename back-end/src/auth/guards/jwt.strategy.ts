import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { configService } from '../../config/config.service';
import { Request } from 'express';
import { UsersService } from '../../users/users.service';
import { TokenPayload } from '../interfaces/tokenPayload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly userService: UsersService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request: Request) => {
					return request?.cookies?.accessToken;
				},
			]),
			secretOrKey: configService.getJwtConfig().jwtSecret,
			ignoreExpiration: true,
			issuer: configService.getJwtConfig().issuer,
			audience: configService.getJwtConfig().audience,
		});
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	async validate(payload: TokenPayload) {
		return this.userService.getById(payload.userId);
	}
}
