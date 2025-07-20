import { ObjectLiteral, SelectQueryBuilder } from 'typeorm'
import { Paginada } from '../types'
import { PaginatorDto } from '../dto/paginator.dto'
export async function executaPaginacao<T extends ObjectLiteral>(
  query: SelectQueryBuilder<T>,
  body: PaginatorDto,
): Promise<Paginada<T>> {
  const page = body.page || 1
  const perPage = body.perPage || 15
  const offset = (page - 1) * perPage + 1
  const limit = page * perPage

  const [itens, total] = await Promise.all([
    query.offset(offset).limit(limit).getMany(),
    page === 1 ? query.getCount() : null,
  ])

  const pages = total ? Math.ceil(total / perPage) : null

  return {
    itens,
    total,
    page,
    perPage,
    pages,
  }
}
