export interface ICreateIngredient {
  name: string,
  price: number
}

export interface IIngredientsRepository {
  create(data: ICreateIngredient): Promise<void>
}
