import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

@Injectable()
export class PasswordService {
  async compare(password: string, hash: string) {
    return bcrypt.compare(password, hash)
  }

  hash(password: string) {
    return bcrypt.hashSync(password, 10)
  }
}
