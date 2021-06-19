import { MigrationInterface, QueryRunner } from 'typeorm';

export class extendProfile1617212331541 implements MigrationInterface {
	name = 'extendProfile1617212331541';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP INDEX "IDX_603379383366b71239acc25e26"`);
		await queryRunner.query(`COMMENT ON COLUMN "users"."createdAt" IS NULL`);
		await queryRunner.query(
			`COMMENT ON COLUMN "users"."lastChangedAt" IS NULL`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_603379383366b71239acc25e26" ON "users" ("id", "createdAt") `,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP INDEX "IDX_603379383366b71239acc25e26"`);
		await queryRunner.query(
			`COMMENT ON COLUMN "users"."lastChangedAt" IS NULL`,
		);
		await queryRunner.query(`COMMENT ON COLUMN "users"."createdAt" IS NULL`);
		await queryRunner.query(
			`CREATE INDEX "IDX_603379383366b71239acc25e26" ON "users" ("id", "createdAt") `,
		);
	}
}
