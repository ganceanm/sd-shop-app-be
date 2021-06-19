import { MigrationInterface, QueryRunner } from 'typeorm';

export class openingEntity1618782930472 implements MigrationInterface {
	name = 'openingEntity1618782930472';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "openings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isDeleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" character varying(300) NOT NULL DEFAULT 'system', "lastChangedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "lastChangedBy" character varying(300) NOT NULL DEFAULT 'system', "name" character varying(64), "rule" character varying(23), "isDefault" boolean NOT NULL DEFAULT false, "order" integer NOT NULL DEFAULT '1', "openingHour" integer, "closingHour" integer, CONSTRAINT "UQ_b26de8a7e579b282bedd6681e39" UNIQUE ("name"), CONSTRAINT "CHK_7ed3fd2fc38cb3b95297ecd30c" CHECK (("openingHour" is null and "closingHour" is null) or ("openingHour" is not null and "closingHour" is not null)), CONSTRAINT "CHK_0e80653c0bed523cd689924675" CHECK ("openingHour" < "closingHour"), CONSTRAINT "CHK_3c6bc61423e1849d701d716c56" CHECK ("closingHour" > 0 AND "closingHour" <= 24), CONSTRAINT "CHK_bdf0f1ea1dfc6a345d27482a58" CHECK ("openingHour" >= 0 AND "openingHour" < 24), CONSTRAINT "CHK_dfa74e010d51c147a2e158d226" CHECK ("order" >= 1), CONSTRAINT "PK_52465524569a0b0e856a64eb48b" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_52465524569a0b0e856a64eb48" ON "openings" ("id") `,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP INDEX "IDX_52465524569a0b0e856a64eb48"`);
		await queryRunner.query(`DROP TABLE "openings"`);
	}
}
