import { units } from '../enums/units'
import { Ingredient } from '../models/ingredient'

export interface AddIngredientModel {
  name: string
  price: number
  unit: keyof typeof units
}

export interface AddIngredient {
  add: (data: AddIngredientModel) => Promise<Ingredient>
}
