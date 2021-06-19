import { MigrationInterface, QueryRunner } from 'typeorm';

export class addStatusToAppointments1618318619490
	implements MigrationInterface {
	name = 'addStatusToAppointments1618318619490';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TYPE "appointments_status_enum" AS ENUM('PENDING', 'SHOWED', 'MISSED', 'CANCELED', 'DELETED')`,
		);
		await queryRunner.query(
			`ALTER TABLE "appointments" ADD "status" "appointments_status_enum" NOT NULL`,
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
		await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "status"`);
		await queryRunner.query(`DROP TYPE "appointments_status_enum"`);
	}
}
