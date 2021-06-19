import { MigrationInterface, QueryRunner } from 'typeorm';

export class changedBaseEntity1617699128609 implements MigrationInterface {
	name = 'changedBaseEntity1617699128609';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isActive"`);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isArchived"`);
		await queryRunner.query(
			`ALTER TABLE "users" ADD "isDeleted" boolean NOT NULL DEFAULT false`,
		);
		await queryRunner.query(`DROP INDEX "IDX_603379383366b71239acc25e26"`);
		await queryRunner.query(`COMMENT ON COLUMN "users"."createdAt" IS NULL`);
		await queryRunner.query(`COMMENT ON COLUMN "users"."createdBy" IS NULL`);
		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "createdBy" SET DEFAULT 'system'`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "users"."lastChangedAt" IS NULL`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "users"."lastChangedBy" IS NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "lastChangedBy" SET DEFAULT 'system'`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_603379383366b71239acc25e26" ON "users" ("id", "createdAt") `,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP INDEX "IDX_603379383366b71239acc25e26"`);
		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "lastChangedBy" SET DEFAULT 'generated'`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "users"."lastChangedBy" IS NULL`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "users"."lastChangedAt" IS NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "createdBy" SET DEFAULT 'generated'`,
		);
		await queryRunner.query(`COMMENT ON COLUMN "users"."createdBy" IS NULL`);
		await queryRunner.query(`COMMENT ON COLUMN "users"."createdAt" IS NULL`);
		await queryRunner.query(
			`CREATE INDEX "IDX_603379383366b71239acc25e26" ON "users" ("id", "createdAt") `,
		);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isDeleted"`);
		await queryRunner.query(
			`ALTER TABLE "users" ADD "isArchived" boolean NOT NULL DEFAULT false`,
		);
		await queryRunner.query(
			`ALTER TABLE "users" ADD "isActive" boolean NOT NULL DEFAULT true`,
		);
	}
}
