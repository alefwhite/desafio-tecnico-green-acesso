import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeImportBoletosUseCase } from '@/usecases/factories/import-boletos'

export async function importBoletos(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const multipart_file = await request.file()

    if (!multipart_file)
      return reply.status(400).send({ message: 'Arquivo não enviado!' })

    const importBoletosUseCase = makeImportBoletosUseCase()

    await importBoletosUseCase.execute({ file: multipart_file })

    return reply.status(201).send({ message: 'Import successfully!' })
  } catch (error) {
    console.log(error)
  }
}
