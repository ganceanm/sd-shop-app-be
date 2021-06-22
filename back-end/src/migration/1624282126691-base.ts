import {MigrationInterface, QueryRunner} from "typeorm";

export class base1624282126691 implements MigrationInterface {
    name = 'base1624282126691'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(64) NOT NULL, "description" character varying(256), CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_ae4578dcaed5adff96595e6166" ON "role" ("name") `);
        await queryRunner.query(`CREATE TABLE "permission" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "target" character varying(64) NOT NULL, "create" boolean NOT NULL DEFAULT false, "read" boolean NOT NULL DEFAULT false, "update" boolean NOT NULL DEFAULT false, "delete" boolean NOT NULL DEFAULT false, "roleId" uuid, CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_27ac184b34042db7b5a381f0e7" ON "permission" ("roleId", "target") `);
        await queryRunner.query(`CREATE TABLE "refresh_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "expires" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "token" character varying(1024) NOT NULL, "userId" uuid, CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_b9af4b6fcbfa0c6294b98cd716" ON "refresh_token" ("userId", "token") `);
        await queryRunner.query(`CREATE TABLE "profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying(128), "lastName" character varying(128), "phone" character varying(15), CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3dd8bfc97e4a77c70971591bdc" ON "profile" ("id") `);
        await queryRunner.query(`CREATE TYPE "payments_type_enum" AS ENUM('TOP_UP', 'CHARGE', 'STORNO')`);
        await queryRunner.query(`CREATE TABLE "payments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isDeleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" character varying(300) NOT NULL DEFAULT 'system', "lastChangedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "lastChangedBy" character varying(300) NOT NULL DEFAULT 'system', "value" real NOT NULL, "type" "payments_type_enum" NOT NULL, "isRevertible" boolean NOT NULL DEFAULT true, "userId" uuid NOT NULL, CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_18688d0ca619b949334a3709ec" ON "payments" ("id", "createdAt") `);
        await queryRunner.query(`CREATE TABLE "openings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isDeleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" character varying(300) NOT NULL DEFAULT 'system', "lastChangedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "lastChangedBy" character varying(300) NOT NULL DEFAULT 'system', "name" character varying(64), "rule" character varying(23), "isDefault" boolean NOT NULL DEFAULT false, "order" integer NOT NULL DEFAULT '1', "openingHour" integer, "closingHour" integer, CONSTRAINT "UQ_b26de8a7e579b282bedd6681e39" UNIQUE ("name"), CONSTRAINT "CHK_7ed3fd2fc38cb3b95297ecd30c" CHECK (("openingHour" is null and "closingHour" is null) or ("openingHour" is not null and "closingHour" is not null)), CONSTRAINT "CHK_0e80653c0bed523cd689924675" CHECK ("openingHour" < "closingHour"), CONSTRAINT "CHK_3c6bc61423e1849d701d716c56" CHECK ("closingHour" > 0 AND "closingHour" <= 24), CONSTRAINT "CHK_bdf0f1ea1dfc6a345d27482a58" CHECK ("openingHour" >= 0 AND "openingHour" < 24), CONSTRAINT "CHK_dfa74e010d51c147a2e158d226" CHECK ("order" >= 1), CONSTRAINT "PK_52465524569a0b0e856a64eb48b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_52465524569a0b0e856a64eb48" ON "openings" ("id") `);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isDeleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" character varying(300) NOT NULL DEFAULT 'system', "lastChangedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "lastChangedBy" character varying(300) NOT NULL DEFAULT 'system', "email" character varying(320) NOT NULL, "password" character varying(256) NOT NULL, "cardId" character varying(256), "resetToken" character varying(128), "social" character varying(128), "credit" real NOT NULL DEFAULT '0', "roleId" uuid, "profileId" uuid NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_501578f69c24fba9ec425535917" UNIQUE ("cardId"), CONSTRAINT "REL_b1bda35cdb9a2c1b777f5541d8" UNIQUE ("profileId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_603379383366b71239acc25e26" ON "users" ("id", "createdAt") `);
        await queryRunner.query(`CREATE TABLE "court-types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(1024) NOT NULL, CONSTRAINT "PK_e23a759835e64574a24430f67c1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7d8f96964a48b319982e196893" ON "court-types" ("id", "name") `);
        await queryRunner.query(`CREATE TABLE "courts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isDeleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" character varying(300) NOT NULL DEFAULT 'system', "lastChangedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "lastChangedBy" character varying(300) NOT NULL DEFAULT 'system', "name" character varying(1024) NOT NULL, "color" character varying(7) NOT NULL, "hourlyCost" real NOT NULL, "typeId" uuid NOT NULL, CONSTRAINT "PK_948a5d356c3083f3237ecbf9897" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_67196333f05e90a34c8c135d1a" ON "courts" ("id", "createdAt") `);
        await queryRunner.query(`CREATE TYPE "appointments_status_enum" AS ENUM('PENDING', 'SHOWED', 'MISSED', 'CANCELED', 'DELETED')`);
        await queryRunner.query(`CREATE TABLE "appointments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isDeleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" character varying(300) NOT NULL DEFAULT 'system', "lastChangedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "lastChangedBy" character varying(300) NOT NULL DEFAULT 'system', "begins" TIMESTAMP WITH TIME ZONE NOT NULL, "status" "appointments_status_enum" NOT NULL, "userId" uuid NOT NULL, "paymentId" uuid NOT NULL, "courtId" uuid NOT NULL, CONSTRAINT "REL_a9ac7a00532b13acdc6d4cbdf9" UNIQUE ("paymentId"), CONSTRAINT "PK_4a437a9a27e948726b8bb3e36ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0778563a2196d202d23566ee1b" ON "appointments" ("id", "createdAt") `);
        await queryRunner.query(`DROP INDEX "IDX_18688d0ca619b949334a3709ec"`);
        await queryRunner.query(`DROP INDEX "IDX_603379383366b71239acc25e26"`);
        await queryRunner.query(`DROP INDEX "IDX_67196333f05e90a34c8c135d1a"`);
        await queryRunner.query(`DROP INDEX "IDX_0778563a2196d202d23566ee1b"`);
        await queryRunner.query(`CREATE INDEX "IDX_18688d0ca619b949334a3709ec" ON "payments" ("id", "createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_603379383366b71239acc25e26" ON "users" ("id", "createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_67196333f05e90a34c8c135d1a" ON "courts" ("id", "createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_0778563a2196d202d23566ee1b" ON "appointments" ("id", "createdAt") `);
        await queryRunner.query(`ALTER TABLE "permission" ADD CONSTRAINT "FK_cdb4db95384a1cf7a837c4c683e" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_8e913e288156c133999341156ad" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_d35cb3c13a18e1ea1705b2817b1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "courts" ADD CONSTRAINT "FK_d05bd1063ebde2a20e004c99f95" FOREIGN KEY ("typeId") REFERENCES "court-types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_01733651151c8a1d6d980135cc4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_a9ac7a00532b13acdc6d4cbdf9a" FOREIGN KEY ("paymentId") REFERENCES "payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_ff5c8f63bc97af9776577257dcb" FOREIGN KEY ("courtId") REFERENCES "courts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_ff5c8f63bc97af9776577257dcb"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_a9ac7a00532b13acdc6d4cbdf9a"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_01733651151c8a1d6d980135cc4"`);
        await queryRunner.query(`ALTER TABLE "courts" DROP CONSTRAINT "FK_d05bd1063ebde2a20e004c99f95"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_d35cb3c13a18e1ea1705b2817b1"`);
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_8e913e288156c133999341156ad"`);
        await queryRunner.query(`ALTER TABLE "permission" DROP CONSTRAINT "FK_cdb4db95384a1cf7a837c4c683e"`);
        await queryRunner.query(`DROP INDEX "IDX_0778563a2196d202d23566ee1b"`);
        await queryRunner.query(`DROP INDEX "IDX_67196333f05e90a34c8c135d1a"`);
        await queryRunner.query(`DROP INDEX "IDX_603379383366b71239acc25e26"`);
        await queryRunner.query(`DROP INDEX "IDX_18688d0ca619b949334a3709ec"`);
        await queryRunner.query(`CREATE INDEX "IDX_0778563a2196d202d23566ee1b" ON "appointments" ("id", "createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_67196333f05e90a34c8c135d1a" ON "courts" ("id", "createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_603379383366b71239acc25e26" ON "users" ("id", "createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_18688d0ca619b949334a3709ec" ON "payments" ("id", "createdAt") `);
        await queryRunner.query(`DROP INDEX "IDX_0778563a2196d202d23566ee1b"`);
        await queryRunner.query(`DROP TABLE "appointments"`);
        await queryRunner.query(`DROP TYPE "appointments_status_enum"`);
        await queryRunner.query(`DROP INDEX "IDX_67196333f05e90a34c8c135d1a"`);
        await queryRunner.query(`DROP TABLE "courts"`);
        await queryRunner.query(`DROP INDEX "IDX_7d8f96964a48b319982e196893"`);
        await queryRunner.query(`DROP TABLE "court-types"`);
        await queryRunner.query(`DROP INDEX "IDX_603379383366b71239acc25e26"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP INDEX "IDX_52465524569a0b0e856a64eb48"`);
        await queryRunner.query(`DROP TABLE "openings"`);
        await queryRunner.query(`DROP INDEX "IDX_18688d0ca619b949334a3709ec"`);
        await queryRunner.query(`DROP TABLE "payments"`);
        await queryRunner.query(`DROP TYPE "payments_type_enum"`);
        await queryRunner.query(`DROP INDEX "IDX_3dd8bfc97e4a77c70971591bdc"`);
        await queryRunner.query(`DROP TABLE "profile"`);
        await queryRunner.query(`DROP INDEX "IDX_b9af4b6fcbfa0c6294b98cd716"`);
        await queryRunner.query(`DROP TABLE "refresh_token"`);
        await queryRunner.query(`DROP INDEX "IDX_27ac184b34042db7b5a381f0e7"`);
        await queryRunner.query(`DROP TABLE "permission"`);
        await queryRunner.query(`DROP INDEX "IDX_ae4578dcaed5adff96595e6166"`);
        await queryRunner.query(`DROP TABLE "role"`);
    }

}
