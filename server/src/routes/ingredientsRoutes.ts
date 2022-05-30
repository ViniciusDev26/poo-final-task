import { Router } from 'express';
import { IngredientsController } from '../controllers/IngredientsController';

const ingredientsController = new IngredientsController();

const ingredientsRoutes = Router();

ingredientsRoutes.get('/', ingredientsController.index);
ingredientsRoutes.post('/', ingredientsController.create);

export { ingredientsRoutes }