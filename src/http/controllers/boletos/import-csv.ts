import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeImportBoletosCsvUseCase } from '@/usecases/factories/import-boletos-csv'

export async function importBoletosCsv(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const multipartFile = await request.file()

    if (!multipartFile)
      return reply.status(400).send({ message: 'Arquivo não enviado!' })

    const importBoletosCsvUseCase = makeImportBoletosCsvUseCase()

    await importBoletosCsvUseCase.execute({ file: multipartFile })

    return reply.status(201).send({ message: 'Import successfully!' })
  } catch (error) {
    console.log(error)
  }
}
