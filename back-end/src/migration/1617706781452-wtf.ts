import { MigrationInterface, QueryRunner } from 'typeorm';

export class wtf1617706781452 implements MigrationInterface {
	name = 'wtf1617706781452';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "profile" RENAME COLUMN "dateOfBirth" TO "phone"`,
		);
		await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "phone"`);
		await queryRunner.query(
			`ALTER TABLE "profile" ADD "phone" character varying(15)`,
		);
		await queryRunner.query(`DROP INDEX "IDX_603379383366b71239acc25e26"`);
		await queryRunner.query(`COMMENT ON COLUMN "users"."createdAt" IS NULL`);
		await queryRunner.query(
			`COMMENT ON COLUMN "users"."lastChangedAt" IS NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`,
		);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
		await queryRunner.query(
			`ALTER TABLE "users" ADD "email" character varying(320) NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_603379383366b71239acc25e26" ON "users" ("id", "createdAt") `,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP INDEX "IDX_603379383366b71239acc25e26"`);
		await queryRunner.query(
			`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`,
		);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
		await queryRunner.query(
			`ALTER TABLE "users" ADD "email" character varying(128) NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "users"."lastChangedAt" IS NULL`,
		);
		await queryRunner.query(`COMMENT ON COLUMN "users"."createdAt" IS NULL`);
		await queryRunner.query(
			`CREATE INDEX "IDX_603379383366b71239acc25e26" ON "users" ("id", "createdAt") `,
		);
		await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "phone"`);
		await queryRunner.query(`ALTER TABLE "profile" ADD "phone" date`);
		await queryRunner.query(
			`ALTER TABLE "profile" RENAME COLUMN "phone" TO "dateOfBirth"`,
		);
	}
}
