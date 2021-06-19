import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'court-types' })
@Index(['id', 'name'])
export class CourtType {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'varchar', length: 1024 })
	name: string;
}
