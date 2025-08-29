import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migration1756424824274 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      UPDATE expense
      SET productId = '01K3J29QTECGD6AP2CSHJAEKHV'
      WHERE id = '01K3FRY2GQDJ0WWP5V1DBMH9VZ'
    `)

    await queryRunner.query(`
      UPDATE product_expense
      SET categoryId = '01K3SDFEMHD2X507PXD3DSH81J',
          name = 'Casa'
      WHERE id = '01K3FRW54YYX6FNSZMMW9ZSFD3'
    `)

    await queryRunner.query(`
      UPDATE product_expense
      SET categoryId = '01K3SDFEMHD2X507PXD3DSH81J'
      WHERE categoryId = '01K3FRTCT1WPZTFQW8YAFQKSRS'
    `)

    await queryRunner.query(`
      UPDATE product_expense
      SET name = 'Aluguel'
      WHERE id = '01K3J29QTECGD6AP2CSHJAEKHV'
    `)

    await queryRunner.query(`
      UPDATE expense
      SET price = 0
      WHERE id IN (
         '01K3Q27SCGP89KPYZBK7628ZND',
         '01K3FRX117RX8BZMJHMTR1SYWN'
        )
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Optional: restore the old values if needed
    // e.g. set productId, categoryId, name back to previous state
  }
}
