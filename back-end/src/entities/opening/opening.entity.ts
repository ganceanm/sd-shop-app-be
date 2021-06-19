import { Check, Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity({ name: 'openings' })
@Check(`"order" >= 1`)
@Check(`"openingHour" >= 0 AND "openingHour" < 24`)
@Check(`"closingHour" > 0 AND "closingHour" <= 24`)
@Check(`"openingHour" < "closingHour"`)
@Check(
	`("openingHour" is null and "closingHour" is null) or ("openingHour" is not null and "closingHour" is not null)`,
)
@Index(['id'])
export class Opening extends BaseEntity {
	@Column('varchar', { length: 64, nullable: true, unique: true })
	name: string;

	@Column('varchar', { length: 23, nullable: true })
	rule: string;

	@Column('boolean', { nullable: false, default: false })
	isDefault: boolean;

	@Column('integer', { nullable: false, default: 1 })
	order: number;

	@Column('integer', { nullable: true })
	openingHour: number;

	@Column('integer', { nullable: true })
	closingHour: number;
}

// await queryRunner.query(`INSERT INTO openings ("name", "isDefault", "order", "openingHour", "closingHour") values ('weekday', true, 1, 8, 22), ('weekend', true, 1, 9, 21)`);
// await queryRunner.query(`DELETE FROM openings WHERE "isDefault" = true`);

// public async up(queryRunner: QueryRunner): Promise<void> {
// 		await queryRunner.query(
// 			`INSERT INTO openings ("name", "isDefault", "order", "openingHour", "closingHour") values ('weekday', true, 1, 8, 22), ('weekend', true, 1, 9, 21)`
// 		);
// 	}
// 	public async down(queryRunner: QueryRunner): Promise<void> {
// 		await queryRunner.query(`DELETE FROM openings WHERE "isDefault" = true`);
// 	}
