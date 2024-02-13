export interface Query {
  locations: string
  positions: string
  types: string
  benefits: string
  salary: number
  sortBy: string
  limit: number
  q: string
}

export interface FindParam {
  locations: string
  positions: string
  types: string
  benefits: string
  salary: number
  q: string
}
