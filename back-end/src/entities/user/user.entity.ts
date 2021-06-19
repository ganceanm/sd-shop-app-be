import {
	Entity,
	Column,
	ManyToOne,
	OneToOne,
	JoinColumn,
	Index,
} from 'typeorm';
import { BaseEntity, Role } from 'src/entities';
import { Profile } from './profile.entity';

@Entity({ name: 'users' })
@Index(['id', 'createdAt'])
export class User extends BaseEntity {
	@Column({ type: 'varchar', length: 320, unique: true })
	email: string;

	@Column({ type: 'varchar', length: 256 })
	password: string;

	@ManyToOne(() => Role, (role) => role.name, { eager: true })
	role: Role;

	@Column({
		type: 'varchar',
		length: 256,
		nullable: true,
		default: null,
		unique: true,
	})
	cardId: string;

	@Column({ type: 'varchar', length: 128, nullable: true })
	resetToken: string;

	@Column({ type: 'varchar', length: 128, nullable: true })
	social: string;

	@OneToOne(() => Profile, { nullable: false, eager: true })
	@JoinColumn()
	profile: Profile;

	@Column('float4', { nullable: false, default: 0 })
	credit: number;
}
