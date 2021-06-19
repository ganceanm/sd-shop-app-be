import { HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { configService } from 'src/config/config.service';
import { TokenPayload } from './interfaces/tokenPayload.interface';
import { User } from 'src/entities';
// import { AuthenticationFailedException } from 'src/util/exceptions/authentication.exception';
import BaseException from '../util/exceptions/base.exception';
import { RefreshTokenService } from './refresh-token/refresh-token.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
		private readonly refreshTokenService: RefreshTokenService,
	) {}

	public async getAuthenticatedUser(
		email: string,
		hashedPassword: string,
	): Promise<User> {
		try {
			const user = await this.usersService.getByEmail(email);
			const isPasswordMatching = await bcrypt.compare(
				hashedPassword,
				user.password,
			);
			if (!isPasswordMatching) {
				// throw new AuthenticationFailedException('200au00');
				throw new BaseException('200au00', HttpStatus.UNAUTHORIZED);
			}

			return user;
		} catch (error) {
			// throw new AuthenticationFailedException('200au00');
			throw new BaseException('200au00', HttpStatus.UNAUTHORIZED);
		}
	}

	public async authWithRefreshToken(
		refreshString: string,
	): Promise<{ access: string; refresh?: string; valid: boolean }> {
		const refreshResult = await this.refreshTokenService.validate(
			refreshString,
		);
		console.log(refreshResult.valid);
		if (refreshResult.valid) {
			return {
				valid: refreshResult.valid,
				access: this.getCookieWithAccessToken(refreshResult.user.id),
			};
		} else {
			return {
				valid: refreshResult.valid,
				...this.getCookiesForLogOut(),
			};
		}
	}

	public async getCookieWithRefreshToken(user: User): Promise<string> {
		const payload: TokenPayload = { userId: user.id };
		const token = this.jwtService.sign(payload, {
			secret: configService.getJwtConfig().refreshSecret,
			expiresIn: `${configService.getJwtConfig().refreshMaxAge}s`,
		});

		const refreshToken = await this.refreshTokenService.create(user, token);
		return `refreshToken=${refreshToken}; Path=/; SameSite=Strict; Max-Age=${
			configService.getJwtConfig().refreshMaxAge
		}`;
	}

	public getCookieWithAccessToken(userId: string): string {
		const payload: TokenPayload = { userId };
		const token = this.jwtService.sign(payload, {
			secret: configService.getJwtConfig().jwtSecret,
			expiresIn: `${configService.getJwtConfig().jwtMaxAge}s`,
		});
		return `accessToken=${token}; Path=/; SameSite=Strict; Max-Age=Session`;
	}

	public getCookiesForLogOut(): { refresh: string; access: string } {
		return {
			refresh: `refreshToken=; Path=/; Max-Age=0`,
			access: `accessToken=; Path=/; Max-Age=0`,
		};
	}

	public async logOut(
		token: string,
	): Promise<{ refresh: string; access: string }> {
		await this.refreshTokenService.invalidate(token);
		return this.getCookiesForLogOut();
	}

	public async solicitPasswordReset(email: string): Promise<boolean> {
		return await this.usersService.resetPassword(email);
	}

	public async setPasswordToken(
		token: string,
		newPassword: string,
	): Promise<boolean> {
		return await this.usersService.setPassWithToken(token, newPassword);
	}

	public async setPasswordUser(
		user: User,
		newPassword: string,
	): Promise<boolean> {
		return await this.usersService.setPassWithUser(user, newPassword);
	}
}
