import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { User } from '../user/user.entity';
import { PaymentType } from '../../payments/enum/payment-type.enum';

@Entity({ name: 'payments' })
@Index(['id', 'createdAt'])
export class Payment extends BaseEntity {
	@Column({ type: 'float4', nullable: false })
	value: number;

	@JoinColumn()
	@ManyToOne(() => User, { nullable: false, eager: true })
	user: User;

	@Column('enum', { nullable: false, name: 'type', enum: PaymentType })
	type: PaymentType;

	@Column('boolean', { nullable: false, default: true })
	isRevertible: boolean;
}
