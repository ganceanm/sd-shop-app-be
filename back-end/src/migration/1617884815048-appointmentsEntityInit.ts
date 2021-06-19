import { MigrationInterface, QueryRunner } from 'typeorm';

export class appointmentsEntityInit1617884815048 implements MigrationInterface {
	name = 'appointmentsEntityInit1617884815048';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TYPE "appointments_court_enum" AS ENUM('ONE', 'TWO')`,
		);
		await queryRunner.query(
			`CREATE TABLE "appointments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isDeleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" character varying(300) NOT NULL DEFAULT 'system', "lastChangedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "lastChangedBy" character varying(300) NOT NULL DEFAULT 'system', "begins" TIMESTAMP WITH TIME ZONE NOT NULL, "court" "appointments_court_enum" NOT NULL, "userId" uuid NOT NULL, "paymentId" uuid NOT NULL, CONSTRAINT "REL_a9ac7a00532b13acdc6d4cbdf9" UNIQUE ("paymentId"), CONSTRAINT "PK_4a437a9a27e948726b8bb3e36ad" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_0778563a2196d202d23566ee1b" ON "appointments" ("id", "createdAt") `,
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
			`CREATE INDEX "IDX_18688d0ca619b949334a3709ec" ON "payments" ("id", "createdAt") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_603379383366b71239acc25e26" ON "users" ("id", "createdAt") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_0778563a2196d202d23566ee1b" ON "appointments" ("id", "createdAt") `,
		);
		await queryRunner.query(
			`ALTER TABLE "appointments" ADD CONSTRAINT "FK_01733651151c8a1d6d980135cc4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "appointments" ADD CONSTRAINT "FK_a9ac7a00532b13acdc6d4cbdf9a" FOREIGN KEY ("paymentId") REFERENCES "payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "appointments" DROP CONSTRAINT "FK_a9ac7a00532b13acdc6d4cbdf9a"`,
		);
		await queryRunner.query(
			`ALTER TABLE "appointments" DROP CONSTRAINT "FK_01733651151c8a1d6d980135cc4"`,
		);
		await queryRunner.query(`DROP INDEX "IDX_0778563a2196d202d23566ee1b"`);
		await queryRunner.query(`DROP INDEX "IDX_603379383366b71239acc25e26"`);
		await queryRunner.query(`DROP INDEX "IDX_18688d0ca619b949334a3709ec"`);
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
		await queryRunner.query(`DROP INDEX "IDX_0778563a2196d202d23566ee1b"`);
		await queryRunner.query(`DROP TABLE "appointments"`);
		await queryRunner.query(`DROP TYPE "appointments_court_enum"`);
	}
}
