import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/entities';
import { Repository } from 'typeorm';
import { Role } from 'src/entities';
import { UpdatePermissionDto } from 'src/admin/dto/update-permission.dto';
import { configService } from 'src/config/config.service';

@Injectable()
export class PermissionService {
	constructor(
		@InjectRepository(Permission)
		private readonly repository: Repository<Permission>,
	) {}

	public async checkAgainstTargetList(role: Role): Promise<string[]> {
		const permissions = (await this.getByRole(role)).map((perm) => perm.target);
		const targetList = configService.getTargetList();
		return targetList.filter((pTarget) => !permissions.includes(pTarget));
	}

	public async getAll(): Promise<Permission[]> {
		return await this.repository.find();
	}

	public async getById(id: string): Promise<Permission> {
		return await this.repository.findOneOrFail({ id: id });
	}

	public async getByRole(role: Role): Promise<Permission[]> {
		return await this.repository.find({
			role: role,
		});
	}

	public async getByTargetAndRole(
		target: string,
		role: Role,
	): Promise<Permission> {
		return await this.repository.findOneOrFail({
			target: target,
			role: role,
		});
	}

	public async create(role: Role, target: string): Promise<string> {
		const isRoot = role.name === 'root';
		const newPermission = this.repository.create({
			role: role,
			target: target,
			create: isRoot,
			read: isRoot,
			update: isRoot,
			delete: isRoot,
		});

		await this.repository.save(newPermission);

		return newPermission.id;
	}

	public async update(id: string, data: UpdatePermissionDto): Promise<boolean> {
		//kellenek ezek az id alapu lekerdezesek, mert az update nem ellenorzi, hogy letezik-e a rekord
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const perm = await this.getById(id);

		const result = await this.repository.update({ id: id }, data);
		return result.affected === 1;
	}

	public async delete(id: string): Promise<boolean> {
		const result = await this.repository.delete({ id: id });
		return result.affected === 1;
	}
}
