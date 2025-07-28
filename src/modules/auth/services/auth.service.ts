import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { TokenPayload } from '../types'
import { UserService } from './user.service'
import { User } from '../../common/entities/user.entity'
import { PasswordService } from './password.service'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private passwordService: PasswordService,
  ) {}

  async validate(email: string, password: string) {
    const user = await this.userService.getOne({ email })

    const equal = await this.passwordService.compare(
      password,
      user?.password || '',
    )

    if (user && equal) {
      return {
        ...user,
        password: undefined,
      }
    }

    return null
  }

  generateJWT(user: User) {
    const payload: TokenPayload = {
      sub: user.id,
      username: user.email,
      user: user,
    }

    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
