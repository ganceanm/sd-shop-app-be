import { MigrationInterface, QueryRunner } from 'typeorm';

export class paymentEntityFieldAddition1617868309523
	implements MigrationInterface {
	name = 'paymentEntityFieldAddition1617868309523';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "payments" ADD "isRevertible" boolean NOT NULL DEFAULT true`,
		);
		await queryRunner.query(`DROP INDEX "IDX_603379383366b71239acc25e26"`);
		await queryRunner.query(`COMMENT ON COLUMN "users"."createdAt" IS NULL`);
		await queryRunner.query(
			`COMMENT ON COLUMN "users"."lastChangedAt" IS NULL`,
		);
		await queryRunner.query(`DROP INDEX "IDX_18688d0ca619b949334a3709ec"`);
		await queryRunner.query(`COMMENT ON COLUMN "payments"."createdAt" IS NULL`);
		await queryRunner.query(
			`COMMENT ON COLUMN "payments"."lastChangedAt" IS NULL`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_603379383366b71239acc25e26" ON "users" ("id", "createdAt") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_18688d0ca619b949334a3709ec" ON "payments" ("id", "createdAt") `,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP INDEX "IDX_18688d0ca619b949334a3709ec"`);
		await queryRunner.query(`DROP INDEX "IDX_603379383366b71239acc25e26"`);
		await queryRunner.query(
			`COMMENT ON COLUMN "payments"."lastChangedAt" IS NULL`,
		);
		await queryRunner.query(`COMMENT ON COLUMN "payments"."createdAt" IS NULL`);
		await queryRunner.query(
			`CREATE INDEX "IDX_18688d0ca619b949334a3709ec" ON "payments" ("id", "createdAt") `,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "users"."lastChangedAt" IS NULL`,
		);
		await queryRunner.query(`COMMENT ON COLUMN "users"."createdAt" IS NULL`);
		await queryRunner.query(
			`CREATE INDEX "IDX_603379383366b71239acc25e26" ON "users" ("id", "createdAt") `,
		);
		await queryRunner.query(
			`ALTER TABLE "payments" DROP COLUMN "isRevertible"`,
		);
	}
}
