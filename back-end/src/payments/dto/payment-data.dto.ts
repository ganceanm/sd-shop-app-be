import { ApiProperty } from '@nestjs/swagger';
import { PaymentType } from '../enum/payment-type.enum';
import { Payment } from '../../entities';

export class PaymentDataDto {
	@ApiProperty({ required: true })
	id: string;

	@ApiProperty({ required: true })
	createdAt: Date;

	@ApiProperty({ required: true })
	value: number;

	@ApiProperty({ required: true })
	type: PaymentType;

	@ApiProperty({ required: true })
	isRevertible: boolean;

	constructor(data: Payment) {
		if (data) {
			this.id = data.id;
			this.createdAt = data.createdAt;
			this.value = data.value;
			this.type = data.type;
			this.isRevertible = data.isRevertible;
		}
	}
}
