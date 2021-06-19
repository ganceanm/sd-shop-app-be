import { MigrationInterface, QueryRunner } from 'typeorm';

export class base1617007934801 implements MigrationInterface {
	name = 'base1617007934801';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(64) NOT NULL, "description" character varying(256), CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_ae4578dcaed5adff96595e6166" ON "role" ("name") `,
		);
		await queryRunner.query(
			`CREATE TABLE "profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying(128), "lastName" character varying(128), "dateOfBirth" date, CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_3dd8bfc97e4a77c70971591bdc" ON "profile" ("id") `,
		);
		await queryRunner.query(
			`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" character varying(300) NOT NULL DEFAULT 'generated', "lastChangedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "lastChangedBy" character varying(300) NOT NULL DEFAULT 'generated', "email" character varying(128) NOT NULL, "password" character varying(256) NOT NULL, "resetToken" character varying(128), "social" character varying(128), "roleId" uuid, "profileId" uuid NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_b1bda35cdb9a2c1b777f5541d8" UNIQUE ("profileId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_603379383366b71239acc25e26" ON "users" ("id", "createdAt") `,
		);
		await queryRunner.query(
			`CREATE TABLE "permission" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "target" character varying(64) NOT NULL, "create" boolean NOT NULL DEFAULT false, "read" boolean NOT NULL DEFAULT false, "update" boolean NOT NULL DEFAULT false, "delete" boolean NOT NULL DEFAULT false, "roleId" uuid, CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_27ac184b34042db7b5a381f0e7" ON "permission" ("roleId", "target") `,
		);
		await queryRunner.query(`DROP INDEX "IDX_603379383366b71239acc25e26"`);
		await queryRunner.query(
			`CREATE INDEX "IDX_603379383366b71239acc25e26" ON "users" ("id", "createdAt") `,
		);
		await queryRunner.query(
			`ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "users" ADD CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "permission" ADD CONSTRAINT "FK_cdb4db95384a1cf7a837c4c683e" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "permission" DROP CONSTRAINT "FK_cdb4db95384a1cf7a837c4c683e"`,
		);
		await queryRunner.query(
			`ALTER TABLE "users" DROP CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87"`,
		);
		await queryRunner.query(
			`ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`,
		);
		await queryRunner.query(`DROP INDEX "IDX_603379383366b71239acc25e26"`);
		await queryRunner.query(
			`CREATE INDEX "IDX_603379383366b71239acc25e26" ON "users" ("id", "createdAt") `,
		);
		await queryRunner.query(`DROP INDEX "IDX_27ac184b34042db7b5a381f0e7"`);
		await queryRunner.query(`DROP TABLE "permission"`);
		await queryRunner.query(`DROP INDEX "IDX_603379383366b71239acc25e26"`);
		await queryRunner.query(`DROP TABLE "users"`);
		await queryRunner.query(`DROP INDEX "IDX_3dd8bfc97e4a77c70971591bdc"`);
		await queryRunner.query(`DROP TABLE "profile"`);
		await queryRunner.query(`DROP INDEX "IDX_ae4578dcaed5adff96595e6166"`);
		await queryRunner.query(`DROP TABLE "role"`);
	}
}
