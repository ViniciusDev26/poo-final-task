import { units } from '../../domain/enums/units'
import { AddIngredient } from '../../domain/usecases/add-ingredient'
import { InvalidParamError } from '../errors/invalid-param-error'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest, ok } from '../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../protocols/http'

export class CreateIngredientController implements Controller {
  constructor (
    private readonly addIngredient: AddIngredient
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['name', 'price', 'unit']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    const { name, price, unit } = httpRequest.body
    const isUnit = units[unit]
    if (!isUnit) return badRequest(new InvalidParamError('unit'))

    const ingredient = await this.addIngredient.add({
      name,
      price,
      unit
    })

    return ok(ingredient)
  }
}
