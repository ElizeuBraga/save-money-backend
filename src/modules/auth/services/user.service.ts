import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { GetUserDto } from 'src/modules/auth/dto/get-user-dto'
import { AuthorizationService } from 'src/modules/authorization/services/authorization.service'
import { User } from 'src/modules/common/entities/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    // private readonly authorizationService: AuthorizationService,
  ) {
  }

  async getOne(body: GetUserDto): Promise<User | null> {
    return await this.repository.findOne({
      select: {
        id: true,
        name: true,
        password: true,
      },
      where: {
        id: body.id,
        email: body.email,
      },
    })
  }

  async create(body: GetUserDto): Promise<User | null> {
    return await this.repository.findOne({
      select: {
        id: true,
        name: true,
        password: true,
      },
      where: {
        id: body.id,
        email: body.email,
      },
    })
  }
}
