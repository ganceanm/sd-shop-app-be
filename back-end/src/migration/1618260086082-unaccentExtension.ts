import { MigrationInterface, QueryRunner } from 'typeorm';

export class unaccentExtension1618260086082 implements MigrationInterface {
	name = 'unaccentExtension1618260086082';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE EXTENSION unaccent`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP EXTENSION unaccent`);
	}
}
