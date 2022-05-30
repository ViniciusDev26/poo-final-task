import { randomUUID } from "crypto";
import { ICreateIngredient } from "../repositories/IIngredientsRepository";

export class Ingredient {
  id: string;
  name: string;
  price: number;

  constructor({name, price}: ICreateIngredient) {
    this.id = randomUUID();
    this.name = name;
    this.price = price;
  }
}