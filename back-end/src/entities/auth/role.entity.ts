import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity({ name: 'role' })
export class Role {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Index({ unique: true })
	@Column({ type: 'varchar', length: 64, unique: true })
	name: string;

	@Column({ type: 'varchar', length: 256, nullable: true })
	description: string;
}
