import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Expense } from '../../common/entities/Expense.entity'
import { Repository } from 'typeorm'

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private readonly repository: Repository<Expense>,
  ) {}

  async resetExpenseFather(id?: string) {
    if (id) {
      const [expense] = await this.repository.find({
        select: {
          expenses: {
            price: true,
          },
        },
        relations: ['expenses'],
        where: { id },
      })

      const total = expense?.expenses
        ?.map((expense) => expense.price)
        .reduce((total, value) => total + value, 0)

      await this.repository.save({ id, price: total })
    }
  }
}
