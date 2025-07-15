import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserService } from '../services/user.service'
import { TokenPayload } from '../types'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('jwt.secret')!,
      ignoreExpiration: configService.get<boolean>('jwt.ignoreExpiration')!,
    })
  }

  async validate(payload: TokenPayload) {
    const user = await this.userService.getOne({
      id: payload.sub,
    })

    return {
      ...user,
      password: null as unknown as string,
    }
  }
}
