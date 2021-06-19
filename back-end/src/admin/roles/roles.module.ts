import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/entities';
import { PermissionModule } from '../permission/permission.module';

@Module({
	imports: [TypeOrmModule.forFeature([Role]), PermissionModule],
	providers: [RolesService],
	exports: [RolesService],
})
export class RolesModule {}
