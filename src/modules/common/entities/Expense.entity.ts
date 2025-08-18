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
import { ProductExpense } from './ProductExpense.entity'

@Entity()
@Unique(['product'])
export class Expense extends BaseEntity {
  @PrimaryColumn({ length: 26 })
  id: string

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number

  @Column()
  month: number

  @Column()
  year: number

  @ManyToOne(() => ProductExpense, (product) => product.expenses, {
    nullable: false,
  })
  product: ProductExpense

  @OneToMany(() => Expense, (expense) => expense.expense)
  expenses: Expense[]

  @ManyToOne(() => Expense, (expense) => expense.expenses)
  expense: Expense

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
