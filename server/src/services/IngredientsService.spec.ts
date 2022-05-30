import { IngredientsRepositoryInMemory } from "../repositories/in-memory/IngredientsRepositoryInMemory";
import { IngredientsService } from "./IngredientsService";

describe('Ingredients Service', () => {
  let ingredientsService: IngredientsService;
  beforeEach(() => {
    const ingredientsRepository = new IngredientsRepositoryInMemory();
    ingredientsService = new IngredientsService(ingredientsRepository);
  })

  it('should return error if price is less then 0', async () => {
    const data = {
      name: 'sugar',
      price: -2.50
    }

    expect(ingredientsService.create(data)).toEqual(new Error('price must be greater than zero'))
  });
});