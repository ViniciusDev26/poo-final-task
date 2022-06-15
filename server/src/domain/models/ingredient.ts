import { units } from '../enums/units'

export interface Ingredient {
  id: string
  name: string
  price: number
  unit: keyof typeof units
}
