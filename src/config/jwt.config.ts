import { registerAs } from '@nestjs/config'
import { JwtModuleOptions } from '@nestjs/jwt'
import { requiredEnvs } from './utils'

export default registerAs<JwtModuleOptions>('jwt', () => {
  requiredEnvs(['JWT_SECRET', 'JWT_EXPIRES_IN'])

  return {
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    ignoreExpiration: process.env.JWT_IGNORE_EXPIRATION === 'true',
  }
})
