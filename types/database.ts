export interface ScamVictim {
  id: number
  name: string
  phone: string
  total_amount: number
  created_at: string
}

export interface ScamVictimInput {
  name: string
  phone: string
  total_amount: number
}
