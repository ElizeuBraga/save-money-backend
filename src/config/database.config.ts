import { registerAs } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { config as dotenvConfig } from 'dotenv'
import { requiredEnvs } from './utils'

dotenvConfig({ path: '.env' })

export default registerAs<TypeOrmModuleOptions>('database', () => {
  requiredEnvs(['DATABASE'])

  const teste = {
    type: 'sqlite',
    database: `data/${process.env.DATABASE}`,
    entities: ['dist/modules/common/entities/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
    autoLoadEntities: true,
    synchronize: true,
  }

  return {
    type: 'sqlite',
    database: `data/${process.env.DATABASE}`,
    entities: ['dist/modules/common/entities/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
    autoLoadEntities: true,
    synchronize: true,
  }
})
