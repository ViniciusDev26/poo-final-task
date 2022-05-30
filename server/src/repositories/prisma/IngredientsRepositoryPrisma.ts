import { connection } from '../../database/connection';
import { Ingredient } from '../../models/Ingredient';
import { ICreateIngredient, IIngredientsRepository } from '../IIngredientsRepository';

export class IngredientsRepositoryPrisma implements IIngredientsRepository{
  async create({name, price}: ICreateIngredient): Promise<void> {
    const { id } = new Ingredient({
      name,
      price
    });

    await connection.ingredient.create({
      data: {
        id,
        name,
        price
      } 
    });
  }
  
}