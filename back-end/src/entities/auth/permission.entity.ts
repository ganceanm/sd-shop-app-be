/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	Entity,
	Column,
	ManyToOne,
	PrimaryGeneratedColumn,
	Index,
} from 'typeorm';
import { Role } from 'src/entities';

@Entity({ name: 'permission' })
@Index(['role', 'target'], { unique: true })
export class Permission {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToOne((type) => Role, (role) => role.name, { eager: true })
	role: Role;

	@Column({ type: 'varchar', length: 64 })
	target: string;

	@Column({ type: 'boolean', default: false })
	create: boolean;

	@Column({ type: 'boolean', default: false })
	read: boolean;

	@Column({ type: 'boolean', default: false })
	update: boolean;

	@Column({ type: 'boolean', default: false })
	delete: boolean;
}
