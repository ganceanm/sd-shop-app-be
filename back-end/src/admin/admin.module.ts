import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { RolesService } from './roles/roles.service';
import { PermissionService } from './permission/permission.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/entities';
import { Permission } from 'src/entities';

@Module({
	imports: [TypeOrmModule.forFeature([Role, Permission])],
	providers: [RolesService, PermissionService],
	controllers: [AdminController],
	exports: [RolesService, PermissionService],
})
export class AdminModule {}
