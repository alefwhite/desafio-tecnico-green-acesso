import { GetBoletosUseCase } from '../boletos/get'

export const makeGetBoletosUseCase = (): GetBoletosUseCase => {
  return new GetBoletosUseCase()
}
