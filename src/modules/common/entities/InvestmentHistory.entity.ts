import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ulid } from 'ulid'
import { Investment } from './Investment.entity'

@Entity()
export class InvestmentHistory extends BaseEntity {
  @PrimaryColumn({ length: 26 })
  id: string

  @ManyToOne(() => Investment, (investment) => investment.history, {
    nullable: false,
  })
  investment: Investment

  @Column()
  price: number

  @Column({ nullable: false, type: 'varchar', length: 64 })
  action: string

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
