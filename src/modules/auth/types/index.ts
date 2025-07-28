import { User } from '../../common/entities/user.entity'

export interface TokenPayload {
  sub: string
  username: string
  user: User
}
