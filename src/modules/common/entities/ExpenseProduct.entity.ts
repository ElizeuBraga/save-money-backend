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
import { CategoryExpense } from './CategoryExpense.entity'
import { Expense } from './Expense.entity'

@Entity()
@Unique(['name'])
export class ExpenseProduct extends BaseEntity {
  @PrimaryColumn({ length: 26 })
  id: string

  @Column({ length: 255 })
  name: string

  @ManyToOne(() => CategoryExpense, (category) => category.products, {
    nullable: false,
  })
  category: CategoryExpense

  @OneToMany(() => Expense, (expense) => expense.product)
  expenses: Expense[]

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
