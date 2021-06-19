import {
	PrimaryGeneratedColumn,
	Column,
	UpdateDateColumn,
	CreateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'boolean', default: false })
	isDeleted: boolean;

	@CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;

	@Column({ type: 'varchar', length: 300, default: 'system' })
	createdBy: string;

	@UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	lastChangedAt: Date;

	@Column({ type: 'varchar', length: 300, default: 'system' })
	lastChangedBy: string;
}
