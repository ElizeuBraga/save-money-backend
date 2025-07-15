import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { TokenPayload } from '../types'
import { UserService } from './user.service'
import { User } from '../../common/entities/user.entity'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async validate(email: string, password: string) {
    const user = await this.userService.getOne({ email })

    if (user && user.password === password) {
      return {
        ...user,
        password: undefined,
      }
    }

    return null
  }

  generateJWT(user: User) {
    const payload: TokenPayload = { sub: user.id, username: user.email }

    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
