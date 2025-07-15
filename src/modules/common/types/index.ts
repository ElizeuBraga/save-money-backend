export class IdResponse {
  id: string | number
}

export class Paginada<T> {
  itens: T[]

  //Can return null case not in page 1
  total?: number

  page: number

  perPage: number

  //Can return null case not in page 1
  pages?: number | null
}
