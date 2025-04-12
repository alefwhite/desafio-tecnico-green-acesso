import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetBoletosUseCase } from '@/usecases/factories/get-boletos'
import { generateBoletosReportPDF } from '@/utils/pdf-generator'

export async function get(request: FastifyRequest, reply: FastifyReply) {
  const { relatorio = null, ...filter } = request.query as {
    nome?: string
    valorInicial?: string
    valorFinal?: string
    loteId?: string
    relatorio?: string
  }

  const geBoletosUseCase = makeGetBoletosUseCase()
  const boletos = await geBoletosUseCase.execute(filter)

  if (relatorio === '1') {
    const pdfBase64 = await generateBoletosReportPDF(boletos)
    return reply.status(200).send({ base64: pdfBase64 })
  }

  return reply.status(200).send(boletos)
}
