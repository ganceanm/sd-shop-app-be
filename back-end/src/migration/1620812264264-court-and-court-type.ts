import {MigrationInterface, QueryRunner} from "typeorm";

export class courtAndCourtType1620812264264 implements MigrationInterface {
    name = 'courtAndCourtType1620812264264'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courts" DROP COLUMN "value"`);
        await queryRunner.query(`COMMENT ON COLUMN "refresh_token"."expires" IS NULL`);
        await queryRunner.query(`DROP INDEX "IDX_18688d0ca619b949334a3709ec"`);
        await queryRunner.query(`COMMENT ON COLUMN "payments"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "payments"."lastChangedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "openings"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "openings"."lastChangedAt" IS NULL`);
        await queryRunner.query(`DROP INDEX "IDX_603379383366b71239acc25e26"`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."lastChangedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."cardId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "cardId" SET DEFAULT null`);
        await queryRunner.query(`DROP INDEX "IDX_0778563a2196d202d23566ee1b"`);
        await queryRunner.query(`COMMENT ON COLUMN "appointments"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "appointments"."lastChangedAt" IS NULL`);
        await queryRunner.query(`DROP INDEX "IDX_67196333f05e90a34c8c135d1a"`);
        await queryRunner.query(`COMMENT ON COLUMN "courts"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "courts"."lastChangedAt" IS NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_18688d0ca619b949334a3709ec" ON "payments" ("id", "createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_603379383366b71239acc25e26" ON "users" ("id", "createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_0778563a2196d202d23566ee1b" ON "appointments" ("id", "createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_67196333f05e90a34c8c135d1a" ON "courts" ("id", "createdAt") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_67196333f05e90a34c8c135d1a"`);
        await queryRunner.query(`DROP INDEX "IDX_0778563a2196d202d23566ee1b"`);
        await queryRunner.query(`DROP INDEX "IDX_603379383366b71239acc25e26"`);
        await queryRunner.query(`DROP INDEX "IDX_18688d0ca619b949334a3709ec"`);
        await queryRunner.query(`COMMENT ON COLUMN "courts"."lastChangedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "courts"."createdAt" IS NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_67196333f05e90a34c8c135d1a" ON "courts" ("id", "createdAt") `);
        await queryRunner.query(`COMMENT ON COLUMN "appointments"."lastChangedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "appointments"."createdAt" IS NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_0778563a2196d202d23566ee1b" ON "appointments" ("id", "createdAt") `);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "cardId" SET DEFAULT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."cardId" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."lastChangedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."createdAt" IS NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_603379383366b71239acc25e26" ON "users" ("id", "createdAt") `);
        await queryRunner.query(`COMMENT ON COLUMN "openings"."lastChangedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "openings"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "payments"."lastChangedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "payments"."createdAt" IS NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_18688d0ca619b949334a3709ec" ON "payments" ("id", "createdAt") `);
        await queryRunner.query(`COMMENT ON COLUMN "refresh_token"."expires" IS NULL`);
        await queryRunner.query(`ALTER TABLE "courts" ADD "value" real NOT NULL`);
    }

}
