export interface Query {
  limit: number
  sortBy: string
  q: string
}

export interface FilterQuery {
  locations: string
  positions: string
  types: string
  benefits: string
  salary: number
  sortBy: string
}
