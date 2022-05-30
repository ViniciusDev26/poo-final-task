import { IIngredientsRepository, ICreateIngredient } from "../repositories/IIngredientsRepository"

class IngredientsService {
  constructor(
    private ingredientsRepository: IIngredientsRepository
  ) {
    this.ingredientsRepository = ingredientsRepository
  }

  create({name, price}: ICreateIngredient) {
    if(price < 0) throw new Error('price must be greater than zero')
    return this.ingredientsRepository.create({
      name,
      price
    })
  }


}

export { IngredientsService }