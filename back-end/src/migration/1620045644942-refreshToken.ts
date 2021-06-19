import { MigrationInterface, QueryRunner } from 'typeorm';

export class refreshToken1620045644942 implements MigrationInterface {
	name = 'refreshToken1620045644942';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "refresh_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "expires" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "token" character varying(1024) NOT NULL, "userId" uuid, CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_b9af4b6fcbfa0c6294b98cd716" ON "refresh_token" ("userId", "token") `,
		);
		await queryRunner.query(`DROP INDEX "IDX_18688d0ca619b949334a3709ec"`);
		await queryRunner.query(`COMMENT ON COLUMN "payments"."createdAt" IS NULL`);
		await queryRunner.query(
			`COMMENT ON COLUMN "payments"."lastChangedAt" IS NULL`,
		);
		await queryRunner.query(`COMMENT ON COLUMN "openings"."createdAt" IS NULL`);
		await queryRunner.query(
			`COMMENT ON COLUMN "openings"."lastChangedAt" IS NULL`,
		);
		await queryRunner.query(`DROP INDEX "IDX_603379383366b71239acc25e26"`);
		await queryRunner.query(`COMMENT ON COLUMN "users"."createdAt" IS NULL`);
		await queryRunner.query(
			`COMMENT ON COLUMN "users"."lastChangedAt" IS NULL`,
		);
		await queryRunner.query(`COMMENT ON COLUMN "users"."cardId" IS NULL`);
		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "cardId" SET DEFAULT null`,
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
		await queryRunner.query(
			`ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_8e913e288156c133999341156ad" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_8e913e288156c133999341156ad"`,
		);
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
			`ALTER TABLE "users" ALTER COLUMN "cardId" DROP DEFAULT`,
		);
		await queryRunner.query(`COMMENT ON COLUMN "users"."cardId" IS NULL`);
		await queryRunner.query(
			`COMMENT ON COLUMN "users"."lastChangedAt" IS NULL`,
		);
		await queryRunner.query(`COMMENT ON COLUMN "users"."createdAt" IS NULL`);
		await queryRunner.query(
			`CREATE INDEX "IDX_603379383366b71239acc25e26" ON "users" ("id", "createdAt") `,
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "openings"."lastChangedAt" IS NULL`,
		);
		await queryRunner.query(`COMMENT ON COLUMN "openings"."createdAt" IS NULL`);
		await queryRunner.query(
			`COMMENT ON COLUMN "payments"."lastChangedAt" IS NULL`,
		);
		await queryRunner.query(`COMMENT ON COLUMN "payments"."createdAt" IS NULL`);
		await queryRunner.query(
			`CREATE INDEX "IDX_18688d0ca619b949334a3709ec" ON "payments" ("id", "createdAt") `,
		);
		await queryRunner.query(`DROP INDEX "IDX_b9af4b6fcbfa0c6294b98cd716"`);
		await queryRunner.query(`DROP TABLE "refresh_token"`);
	}
}
