import {
  Inject,
  Injectable,
  Scope,
  UnauthorizedException,
} from '@nestjs/common'
import { RoleEnum } from '../../common/types/enum'
import { User } from '../../common/entities/user.entity'
import { REQUEST } from '@nestjs/core'
import { TokenPayload } from '../../auth/types'

@Injectable({ scope: Scope.REQUEST })
export class AuthorizationService {
  constructor(@Inject(REQUEST) private readonly request: TokenPayload) {}
  validate(roles: (string | RoleEnum)[]) {
    if (!this.request.user.id) {
      throw new UnauthorizedException('User not authenticated')
    }

    const can = this.can(this.request.user, roles)

    if (!can) {
      throw new UnauthorizedException()
    }

    return this.request.user.id
  }

  can(user: User, roles: string[]): boolean {
    return (
      !!user &&
      roles
        .map((role) => this.fillRole(role))
        .some((role) => user.roles?.includes(role))
    )
  }

  fillRole(role: string, enterpriseId?: string) {
    if (enterpriseId) {
      // example: enterprise:{enterpriseId}:user:create
      // like -> 01JQW1FR9AHP89838BTJB5DX3V:user:create
      return role.replace('{enterpriseId}', enterpriseId)
    }
    return role
  }
}
