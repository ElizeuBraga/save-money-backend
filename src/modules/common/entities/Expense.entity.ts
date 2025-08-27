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
  UpdateDateColumn,
} from 'typeorm'
import { ulid } from 'ulid'
import { ProductExpense } from './ProductExpense.entity'

@Entity()
export class Expense extends BaseEntity {
  @PrimaryColumn({ length: 26 })
  id: string

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number

  @ManyToOne(() => ProductExpense, (product) => product.expenses, {
    nullable: false,
  })
  product: ProductExpense

  @OneToMany(() => Expense, (expense) => expense.expense)
  expenses?: Expense[]

  @ManyToOne(() => Expense, (expense) => expense.expenses, {
    nullable: true,
  })
  expense?: Expense

  @Column({ type: 'date' })
  expiration: Date

  @Column({ default: false })
  paid: boolean

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
