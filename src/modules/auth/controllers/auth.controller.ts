import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'
import { User } from 'src/modules/common/entities/user.entity'
import { AuthService } from '../services/auth.service'
import { Public } from '../utils/public.metadata'
import { CreateUserUsecase } from '../usecases/create-user.usecase'
import { CreateUserDto } from '../dto/create-user-dto'
import { ApiBody } from '@nestjs/swagger'
import { LoginDto } from '../dto/login-dto'
import { Login } from '../decorators/login.metadata'
import { MultipleAuthGuard } from '../guard/multiple-auth.guard'
import { Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly createUseCase: CreateUserUsecase,
  ) {}

  /**
   * Rota limitada à 5 requisições (acertando ou errando a senha).
   * A rota é liberada para o usuário após 1 minuto
   */
  @ApiBody({ type: LoginDto })
  @Login()
  @UseGuards(MultipleAuthGuard)
  @Post('login')
  login(
    @Request() { user }: { user: User },
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = this.authService.generateJWT(user)

    res.cookie('access_token', result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 60 * 60 * 24 * 1000, // 1 day
      path: '/',
    })

    return result
  }

  @ApiBody({ type: CreateUserDto })
  @Public()
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('register')
  register(@Body() body: CreateUserDto) {
    return this.createUseCase.exec(body)
  }

  @Get('profile')
  profile(@Request() { user }: { user: User }) {
    return user
  }
}
