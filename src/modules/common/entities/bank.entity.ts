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
import { Paper } from './Paper.entity'

@Entity()
@Unique(['name'])
export class Bank extends BaseEntity {
  @PrimaryColumn({ length: 26 })
  id: string

  @Column({ length: 255 })
  name: string

  @Column()
  logo: string

  @OneToMany(() => Investment, (investment) => investment.bank)
  investments: Investment[]

  percentInvested?: number

  totalInvested?: number

  papers?: Paper[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date

  @BeforeInsert()
  generateId() {
    this.id = this.id || ulid()
  }
}
