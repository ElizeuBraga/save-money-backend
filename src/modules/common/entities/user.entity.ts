import { Exclude } from 'class-transformer'
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm'
import { ulid } from 'ulid'
import { Investment } from './Investment.entity'

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryColumn({ length: 26 })
  id: string

  @Column({ length: 255 })
  name: string

  @Column({ length: 255 })
  email: string

  @OneToMany(() => Investment, (investment) => investment.bank)
  investments: Investment[]

  @Exclude()
  @Column({ length: 255, nullable: true })
  password?: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date

  roles = [
    'bank:read',
    'bank:create',
    'bank:update',
    'category:read',
    'category:create',
    'category:update',
    'product:read',
    'product:create',
    'product:update',
    'paper:read',
    'paper:create',
    'paper:update',
    'investment:read',
    'investment:create',
    'investment:update',
    'expenseProduct:read',
    'expenseProduct:create',
    'expenseProduct:update',
    'expenseCategory:read',
    'expenseCategory:create',
    'expenseCategory:update',
    'expense:read',
    'expense:update',
    'expense:create',
  ]

  @BeforeInsert()
  generateId() {
    this.id = this.id || ulid()
  }
}
