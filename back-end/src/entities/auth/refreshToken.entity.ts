/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	Index,
	CreateDateColumn,
	Column,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity({ name: 'refresh_token' })
@Index(['user', 'token'], { unique: true })
export class RefreshToken {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToOne((type) => User, (user) => user.id, { eager: true })
	user: User;

	@CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	expires: Date;

	@Column({ type: 'varchar', length: 1024 })
	token: string;
}
