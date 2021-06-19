import {
	Controller,
	Post,
	Body,
	HttpCode,
	UseGuards,
	Req,
	Res,
	Put,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthenticationGuard } from './guards/local.guard';
import RequestWithUser from './interfaces/requestWithUser.interface';
import { Request, Response } from 'express';
import JwtAuthGuard from './guards/jwt-auth.guard';
import ResetPasswordDto from './dto/reset-password.dto';
import { ModificationResponseDto } from 'src/dto/modification.response.dto';
import { ApiResponse } from '@nestjs/swagger';
import SetPasswordTokenDto from './dto/set-password-token.dto';
import SetPasswordUserDto from './dto/set-password-user.dto';
import RefreshTokenDto from './dto/refreshToken.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@HttpCode(200)
	@UseGuards(LocalAuthenticationGuard)
	@Post()
	async logInWithPassword(
		@Req() request: RequestWithUser,
		@Res() response: Response,
	): Promise<Response> {
		const { user } = request;
		const refreshCookie = await this.authService.getCookieWithRefreshToken(
			user,
		);
		const accessCookie = this.authService.getCookieWithAccessToken(user.id);
		response.setHeader('Set-Cookie', [refreshCookie, accessCookie]);
		response.json({
			success: true,
		});
		return response.send();
	}

	@HttpCode(200)
	@Put('refresh-token')
	async logInWithRefreshToken(
		@Body() dto: RefreshTokenDto,
		@Res() response: Response,
	): Promise<Response> {
		const { refreshToken } = dto;

		try {
			const token = await this.authService.authWithRefreshToken(refreshToken);
			response.setHeader('Set-Cookie', token.access);
			console.log(token);
			response.json({
				success: true,
			});
			return response.send();
		} catch (e) {
			const cookies = this.authService.getCookiesForLogOut();
			response.setHeader('Set-Cookie', [cookies.refresh, cookies.access]);
			response.json({
				success: false,
			});
			return response.send();
		}
	}

	@UseGuards(JwtAuthGuard)
	@Put('logout')
	async logOut(
		@Res() response: Response,
		@Req() request: Request,
	): Promise<Response> {
		console.log(request.cookies);
		const cookies = await this.authService.logOut(
			request.cookies['refreshToken'],
		);
		response.setHeader('Set-Cookie', [cookies.refresh, cookies.access]);
		return response.sendStatus(200);
	}

	@Post('reset-password')
	@ApiResponse({ status: 200, type: ModificationResponseDto })
	async solicitPasswordReset(
		@Body() dto: ResetPasswordDto,
	): Promise<ModificationResponseDto> {
		const result = await this.authService.solicitPasswordReset(dto.email);
		return new ModificationResponseDto(result);
	}

	@Post('password')
	@ApiResponse({ status: 200, type: ModificationResponseDto })
	async setPasswordWithToken(
		@Body() dto: SetPasswordTokenDto,
	): Promise<ModificationResponseDto> {
		if (dto.password !== dto.confirmPassword) {
			throw new HttpException(
				'Passwords do not match!',
				HttpStatus.NOT_ACCEPTABLE,
			);
		} else {
			const result = await this.authService.setPasswordToken(
				dto.token,
				dto.password,
			);
			return new ModificationResponseDto(result);
		}
	}

	@UseGuards(JwtAuthGuard)
	@Put('password')
	@ApiResponse({ status: 200, type: ModificationResponseDto })
	async setPasswordWithUser(
		@Req() request: RequestWithUser,
		@Body() dto: SetPasswordUserDto,
	): Promise<ModificationResponseDto> {
		if (dto.password !== dto.confirmPassword) {
			throw new HttpException(
				'Passwords do not match!',
				HttpStatus.NOT_ACCEPTABLE,
			);
		} else {
			const result = await this.authService.setPasswordUser(
				request.user,
				dto.password,
			);
			return new ModificationResponseDto(result);
		}
	}
}
