export class InvalidParamError extends Error {
  constructor (param: string) {
    super(`${param} is invalid`)
    this.name = 'InvalidParamError'
  }
}
