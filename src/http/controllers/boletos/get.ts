import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetBoletosUseCase } from '@/usecases/factories/get-boletos'

export async function get(request: FastifyRequest, reply: FastifyReply) {
  const filter = request.query as {
    name?: string
    valorInicial?: string
    valorFinal?: string
    loteId?: string
  }

  const geBoletosUseCase = makeGetBoletosUseCase()

  const boletos = await geBoletosUseCase.execute(filter)

  return reply.status(200).send(boletos)
}
