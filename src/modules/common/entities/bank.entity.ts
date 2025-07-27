import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm'
import { ulid } from 'ulid'

@Entity()
@Unique(['name'])
export class Bank extends BaseEntity {
  @PrimaryColumn({ length: 26 })
  id: string

  @Column({ length: 255 })
  name: string

  @Column()
  logo: string

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
