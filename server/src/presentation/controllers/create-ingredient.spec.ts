import { Ingredient } from '../../domain/models/ingredient'
import { AddIngredient, AddIngredientModel } from '../../domain/usecases/add-ingredient'
import { InvalidParamError } from '../errors/invalid-param-error'
import { MissingParamError } from '../errors/missing-param-error'
import { CreateIngredientController } from './create-ingredient'

interface SutType {
  sut: CreateIngredientController
  addIngredientStub: AddIngredient
}
const makeAddIngredient = (): AddIngredient => {
  class AddIngredientStub implements AddIngredient {
    async add (data: AddIngredientModel): Promise<Ingredient> {
      const fakeIngredient: Ingredient = {
        id: 'valid_id',
        name: 'valid_name',
        price: 2,
        unit: 'KG'
      }

      return await new Promise((resolve) => resolve(fakeIngredient))
    }
  }

  return new AddIngredientStub()
}
const makeSut = (): SutType => {
  const addIngredientStub = makeAddIngredient()
  const sut = new CreateIngredientController(addIngredientStub)

  return {
    sut,
    addIngredientStub
  }
}
describe('CreateIngredientController', () => {
  it('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        price: 2,
        unit: 1
      }
    }

    const response = await sut.handle(httpRequest)

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('name'))
  })

  it('Should return 400 if no price is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'Sugar',
        unit: 1
      }
    }

    const response = await sut.handle(httpRequest)

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('price'))
  })

  it('Should return 400 if no unit is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'Sugar',
        price: 2
      }
    }

    const response = await sut.handle(httpRequest)

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('unit'))
  })

  it('Should return 400 if no valid unit is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'Sugar',
        price: 2,
        unit: 'invalidUnit'
      }
    }

    const response = await sut.handle(httpRequest)

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new InvalidParamError('unit'))
  })

  it('Should call AddAccount with correct params', async () => {
    const { sut, addIngredientStub } = makeSut()
    const httpRequest = {
      body: {
        name: 'Sugar',
        price: 2,
        unit: 'KG'
      }
    }

    const addSpy = jest.spyOn(addIngredientStub, 'add')
    await sut.handle(httpRequest)

    expect(addSpy).toHaveBeenCalledWith({
      name: 'Sugar',
      price: 2,
      unit: 'KG'
    })
  })

  it('Should return 200 if correct params is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'Sugar',
        price: 2,
        unit: 'KG'
      }
    }

    const response = await sut.handle(httpRequest)

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      price: 2,
      unit: 'KG'
    })
  })
})
