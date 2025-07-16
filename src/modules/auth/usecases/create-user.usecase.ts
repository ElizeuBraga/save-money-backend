import { ConflictException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { to } from 'src/modules/common/utils/to.util'
import { Repository } from 'typeorm'
import { Transactional } from 'typeorm-transactional'
import { User } from '../../common/entities/user.entity'
import { CreateUserDto } from '../dto/create-user-dto'
import { PasswordService } from '../services/password.service'

@Injectable()
export class CreateUserUsecase {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private readonly passwordService: PasswordService,
  ) {}

  @Transactional()
  async exec(body: CreateUserDto) {
    let user = await this.repository.findOne({
      where: { email: body.email },
    })

    if (user?.deletedAt) {
      throw new ConflictException(
        'Usuario excluído, favor entrar em contato com o administrador.',
      )
    }

    if (user) {
      throw new ConflictException('Usuário já existe na base de dados')
    }

    if (!user) {
      const hash = this.passwordService.hash(body.password)

      user = this.repository.create({
        name: body.name,
        email: body.email,
        password: hash,
      })

      const [err] = await to(this.repository.save(user))

      if (err) {
        throw new ConflictException('Não foi possível cadastrar o usuário.')
      }
    }

    return user
  }
}
