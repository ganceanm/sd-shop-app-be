import { MigrationInterface, QueryRunner } from 'typeorm';

export class addedCreditToUsers1617952716267 implements MigrationInterface {
	name = 'addedCreditToUsers1617952716267';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "users" ADD "credit" real NOT NULL DEFAULT '0'`,
		);
		await queryRunner.query(`DROP INDEX "IDX_18688d0ca619b949334a3709ec"`);
		await queryRunner.query(`COMMENT ON COLUMN "payments"."createdAt" IS NULL`);
		await queryRunner.query(
			`COMMENT ON COLUMN "payments"."lastChangedAt" IS NULL`,
		);
		await queryRunner.query(`DROP INDEX "IDX_603379383366b71239acc25e26"`);
		await queryRunner.query(`COMMENT ON COLUMN "users"."createdAt" IS NULL`);
		await queryRunner.query(
			`COMMENT ON COLUMN "users"."lastChangedAt" IS NULL`,
		);
		await queryRunner.query(`DROP INDEX "IDX_0778563a2196d202d23566ee1b"`);
		await queryRunner.query(
			`COMMENT ON COLUMN "appointments"."createdAt" IS NULL`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "appointments"."lastChangedAt" IS NULL`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_18688d0ca619b949334a3709ec" ON "payments" ("id", "createdAt") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_603379383366b71239acc25e26" ON "users" ("id", "createdAt") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_0778563a2196d202d23566ee1b" ON "appointments" ("id", "createdAt") `,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP INDEX "IDX_0778563a2196d202d23566ee1b"`);
		await queryRunner.query(`DROP INDEX "IDX_603379383366b71239acc25e26"`);
		await queryRunner.query(`DROP INDEX "IDX_18688d0ca619b949334a3709ec"`);
		await queryRunner.query(
			`COMMENT ON COLUMN "appointments"."lastChangedAt" IS NULL`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "appointments"."createdAt" IS NULL`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_0778563a2196d202d23566ee1b" ON "appointments" ("id", "createdAt") `,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "users"."lastChangedAt" IS NULL`,
		);
		await queryRunner.query(`COMMENT ON COLUMN "users"."createdAt" IS NULL`);
		await queryRunner.query(
			`CREATE INDEX "IDX_603379383366b71239acc25e26" ON "users" ("id", "createdAt") `,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "payments"."lastChangedAt" IS NULL`,
		);
		await queryRunner.query(`COMMENT ON COLUMN "payments"."createdAt" IS NULL`);
		await queryRunner.query(
			`CREATE INDEX "IDX_18688d0ca619b949334a3709ec" ON "payments" ("id", "createdAt") `,
		);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "credit"`);
	}
}
