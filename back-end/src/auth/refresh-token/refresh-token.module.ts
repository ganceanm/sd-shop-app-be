import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from 'src/entities';
import { RefreshTokenService } from './refresh-token.service';

@Module({
	imports: [TypeOrmModule.forFeature([RefreshToken])],
	providers: [RefreshTokenService],
	exports: [RefreshTokenService],
})
export class RefreshTokenModule {}
