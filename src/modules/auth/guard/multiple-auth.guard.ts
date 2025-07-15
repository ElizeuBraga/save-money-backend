import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class MultipleAuthGuard extends AuthGuard(['local']) {}
