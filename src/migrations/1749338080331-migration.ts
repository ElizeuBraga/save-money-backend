import { MigrationInterface, QueryRunner } from "typeorm";
import { ulid } from 'ulid'

export class Migration1749338080331 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`INSERT INTO bank(id, name) VALUES ('${ulid()}', 'Nubank')`)
      await queryRunner.query(`INSERT INTO bank(id, name) VALUES ('${ulid()}', 'C6')`)
      await queryRunner.query(`INSERT INTO bank(id, name) VALUES ('${ulid()}', 'Mercado Pago')`)
      await queryRunner.query(`INSERT INTO bank(id, name) VALUES ('${ulid()}', 'Banco Inter')`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`DELETE FROM bank`)
    }

}
