import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'
import { User } from 'src/modules/common/entities/user.entity'
import { MultipleAuthGuard } from '../guard/multiple-auth.guard'
import { AuthService } from '../services/auth.service'
import { Public } from '../utils/public.metadata'
import { CreateUserUsecase } from '../usecases/create-user.usecase'
import { CreateUserDto } from '../dto/create-user-dto'

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
  @Public()
  @UseGuards(MultipleAuthGuard)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('login')
  @HttpCode(200)
  login(@Request() { user }: { user: User }) {
    return this.authService.generateJWT(user)
  }

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
