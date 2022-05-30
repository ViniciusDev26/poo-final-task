import { connection } from '../../database/connection';
import { Ingredient } from '../../models/Ingredient';
import { ICreateIngredient, IIngredientsRepository } from '../IIngredientsRepository';

export class IngredientsRepositoryInMemory implements IIngredientsRepository{
  private ingredients: Ingredient[] = [];

  async create({name, price}: ICreateIngredient): Promise<void> {
    const ingredient = new Ingredient({
      name,
      price
    });

    this.ingredients.push(ingredient);
  }
  
}