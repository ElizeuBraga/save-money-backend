import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm'
import { ulid } from 'ulid'
import { Bank } from './bank.entity'
import { Paper } from './Paper.entity'
import { User } from './user.entity'
import { InvestmentHistory } from './InvestmentHistory.entity'

@Entity()
@Unique(['bank', 'paper', 'user'])
export class Investment extends BaseEntity {
  @PrimaryColumn({ length: 26 })
  id: string

  @ManyToOne(() => Bank, (bank) => bank.investments, { nullable: false })
  bank: Bank

  @ManyToOne(() => Paper, (paper) => paper.investments, { nullable: false })
  paper: Paper

  @ManyToOne(() => User, (user) => user.investments, { nullable: false })
  user: User

  @OneToMany(() => InvestmentHistory, (history) => history.investment)
  history: InvestmentHistory[]

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number

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
