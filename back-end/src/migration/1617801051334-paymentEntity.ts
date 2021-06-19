import { MigrationInterface, QueryRunner } from 'typeorm';

export class paymentEntity1617801051334 implements MigrationInterface {
	name = 'paymentEntity1617801051334';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TYPE "payments_type_enum" AS ENUM('TOP_UP', 'CHARGE', 'STORNO')`,
		);
		await queryRunner.query(
			`CREATE TABLE "payments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isDeleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" character varying(300) NOT NULL DEFAULT 'system', "lastChangedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "lastChangedBy" character varying(300) NOT NULL DEFAULT 'system', "value" real NOT NULL, "type" "payments_type_enum" NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_18688d0ca619b949334a3709ec" ON "payments" ("id", "createdAt") `,
		);
		await queryRunner.query(`DROP INDEX "IDX_603379383366b71239acc25e26"`);
		await queryRunner.query(`COMMENT ON COLUMN "users"."createdAt" IS NULL`);
		await queryRunner.query(
			`COMMENT ON COLUMN "users"."lastChangedAt" IS NULL`,
		);
		await queryRunner.query(`DROP INDEX "IDX_18688d0ca619b949334a3709ec"`);
		await queryRunner.query(
			`CREATE INDEX "IDX_603379383366b71239acc25e26" ON "users" ("id", "createdAt") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_18688d0ca619b949334a3709ec" ON "payments" ("id", "createdAt") `,
		);
		await queryRunner.query(
			`ALTER TABLE "payments" ADD CONSTRAINT "FK_d35cb3c13a18e1ea1705b2817b1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "payments" DROP CONSTRAINT "FK_d35cb3c13a18e1ea1705b2817b1"`,
		);
		await queryRunner.query(`DROP INDEX "IDX_18688d0ca619b949334a3709ec"`);
		await queryRunner.query(`DROP INDEX "IDX_603379383366b71239acc25e26"`);
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
		await queryRunner.query(`DROP INDEX "IDX_18688d0ca619b949334a3709ec"`);
		await queryRunner.query(`DROP TABLE "payments"`);
		await queryRunner.query(`DROP TYPE "payments_type_enum"`);
	}
}
