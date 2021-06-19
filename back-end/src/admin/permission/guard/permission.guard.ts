import {
	Injectable,
	CanActivate,
	ExecutionContext,
	Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionService } from '../permission.service';

@Injectable()
export class PermissionGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		@Inject(PermissionService)
		private readonly permissionService: PermissionService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const target = this.reflector.get<string[]>('target', context.getHandler());
		const operation = this.reflector.get<string[]>(
			'operation',
			context.getHandler(),
		);
		if (!target || !operation) {
			return true;
		}

		const request = context.switchToHttp().getRequest();

		return await this.matchPermission(
			target[0],
			operation[0],
			request.user.role,
		);
	}

	private async matchPermission(target, operation, role) {
		const permission = await this.permissionService.getByTargetAndRole(
			target,
			role,
		);

		return permission[operation];
	}
}
