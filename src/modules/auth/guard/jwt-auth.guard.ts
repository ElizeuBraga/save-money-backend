import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { IS_LOGIN_KEY } from '../decorators/login.metadata'
import { IS_PUBLIC_KEY } from '../decorators/public.metadata'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    const isLogin = this.reflector.getAllAndOverride<boolean>(IS_LOGIN_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isLogin) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const token = request.headers.authorization?.split(' ')[1]

    if (!token && isPublic) {
      return true
    }

    return super.canActivate(context)
  }
}
