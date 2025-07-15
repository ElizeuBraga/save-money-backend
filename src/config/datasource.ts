/**
 * Arquivo utilizando nas linhas de comandos de geração de migrations e execução
 */

import { config as dotenvConfig } from 'dotenv'
import { DataSource } from 'typeorm'

dotenvConfig({ path: '.env' })

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: `data/${process.env.DATABASE}`,
  entities: ['src/modules/common/entities/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*{.ts,.js}'],
  logging: true,
})

export default AppDataSource
