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
import { Product } from './Product.entity'
import { Investment } from './Investments.entity'

@Entity()
@Unique(['name'])
export class Paper extends BaseEntity {
  @PrimaryColumn({ length: 26 })
  id: string

  @Column({ length: 255 })
  name: string

  @ManyToOne(() => Product, (product) => product.papers, { nullable: false })
  product: Product

  @OneToMany(() => Investment, (investment) => investment.bank)
  investments: Investment[]

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
