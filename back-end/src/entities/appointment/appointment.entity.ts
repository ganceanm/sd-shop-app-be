import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToOne,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Payment } from '../payment/payment.entity';
import { BaseEntity } from '../base/base.entity';
import { Status } from '../../appointments/enum/status.enum';
import { Court } from '../court/court.entity';

@Entity({ name: 'appointments' })
@Index(['id', 'createdAt'])
export class Appointment extends BaseEntity {
	@Column('timestamptz', { nullable: false })
	begins: Date;

	@JoinColumn()
	@ManyToOne(() => User, { nullable: false, eager: true })
	user: User;

	@JoinColumn()
	@OneToOne(() => Payment, { nullable: false, eager: true })
	payment: Payment;

	@JoinColumn()
	@ManyToOne(() => Court, { nullable: false, eager: true })
	court: Court;

	@Column('enum', { nullable: false, name: 'status', enum: Status })
	status: Status;
}
