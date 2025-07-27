import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import databaseConfig from './config/database.config'
import jwtConfig from './config/jwt.config'
import { AuthModule } from './modules/auth/auth.module'
import { JwtAuthGuard } from './modules/auth/guard/jwt-auth.guard'
import { BankModule } from './modules/banks/bank.module'
import { DevelopModule } from './modules/develop/develop.module'
import { CategoryModule } from './modules/categories/category.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get<TypeOrmModuleOptions>('database')!
      },
    }),
    ThrottlerModule.forRoot({
      // Zeramos no uso global para poder restringir direto na rota desejada
      throttlers: [{ ttl: 0, limit: 0 }],
    }),
    AuthModule,
    BankModule,
    DevelopModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
