import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { CourtType } from './court-type.entity';

@Entity({ name: 'courts' })
@Index(['id', 'createdAt'])
export class Court extends BaseEntity {
	@ManyToOne(() => CourtType, (type) => type, {
		eager: true,
		nullable: false,
	})
	type: CourtType;

	@Column({ type: 'varchar', length: 1024, nullable: false })
	name: string;

	@Column({ type: 'varchar', length: 7, nullable: false })
	color: string;

	@Column({ type: 'float4', nullable: false })
	hourlyCost: number;
}
