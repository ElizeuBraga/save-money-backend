import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthorizationModule } from '../authorization/authorization.module'
import { CONTROLLERS } from './controllers'
import { USE_CASES } from './index'
import { Todo } from '../common/entities/todo.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), AuthorizationModule],
  controllers: [...CONTROLLERS],
  providers: [
    //...SERVICES,
    ...USE_CASES,
  ],
})
export class DevelopModule {}
