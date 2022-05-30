import { Request, Response } from "express";
import { Ingredient } from "../models/Ingredient";

class IngredientsController {
  async index(req: Request, res: Response) {
    
  }

  async create(req: Request, res: Response) {
    const requiredFields = ['name', 'price']
    for(const field of requiredFields){
      if(!req.body[field]) return res.status(400).send(`${field} is required`)
    }
    const {name, price} = req.body;

    const ingredient = new Ingredient({
      name,
      price
    })

    return res.status(201).send();
  }
}

export { IngredientsController }