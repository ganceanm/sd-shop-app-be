import { MigrationInterface, QueryRunner } from 'typeorm';

export class addedCardIdToUsers1618837156035 implements MigrationInterface {
	name = 'addedCardIdToUsers1618837156035';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "users" ADD "cardId" character varying(256)`,
		);
		await queryRunner.query(
			`ALTER TABLE "users" ADD CONSTRAINT "UQ_501578f69c24fba9ec425535917" UNIQUE ("cardId")`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "users" DROP CONSTRAINT "UQ_501578f69c24fba9ec425535917"`,
		);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "cardId"`);
	}
}
