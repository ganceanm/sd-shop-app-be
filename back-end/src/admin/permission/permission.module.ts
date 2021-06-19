import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { Permission } from 'src/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionGuard } from './guard/permission.guard';

@Module({
	imports: [TypeOrmModule.forFeature([Permission])],
	providers: [PermissionService, PermissionGuard],
	exports: [PermissionService, PermissionGuard],
})
export class PermissionModule {}
