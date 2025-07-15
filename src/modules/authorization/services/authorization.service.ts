import { Injectable, UnauthorizedException } from '@nestjs/common'
import { RoleEnum } from '../../common/types/enum'
import { User } from '../../common/entities/user.entity'

@Injectable()
export class AuthorizationService {
  validate(user: User, roles: (string | RoleEnum)[]) {
    const can = this.can(user, roles)

    if (!can) {
      throw new UnauthorizedException()
    }
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
