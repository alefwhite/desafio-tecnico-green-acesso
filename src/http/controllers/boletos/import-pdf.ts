import { makeImportBoletosPdfUseCase } from '@/usecases/factories/import-boletos-pdf'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function importBoletosPdf(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const file = await request.file()

  if (!file) {
    return reply.status(400).send({ error: 'Nenhum arquivo enviado' })
  }

  if (file.mimetype !== 'application/pdf') {
    return reply.status(400).send({ error: 'Arquivo deve ser um PDF' })
  }

  const importBoletosPdf = makeImportBoletosPdfUseCase()

  await importBoletosPdf.execute({ file })

  return reply.status(200).send({ message: 'Import successfully!' })
}
