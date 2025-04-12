import type { CsvConverter } from '@/contracts/csv'
import { makePrismaConnection } from '@/database/factories/connection'
import type { MultipartFile } from '@fastify/multipart'

type ImportBoletoDTO = {
  file: MultipartFile
}

export class ImportBoletosCsvUseCase {
  constructor(
    private readonly csvToJson: CsvConverter,
    private readonly prisma = makePrismaConnection()
  ) {}

  async execute({ file }: ImportBoletoDTO) {
    const boletosData = await this.csvToJson.convert(file)

    await this.prisma.$transaction(async tx => {
      const lotesMap = new Map()

      for (const boleto of boletosData) {
        if (lotesMap.has(boleto.unidade)) {
          const existingBoleto = await tx.boleto.findFirst({
            where: {
              nomeSacado: boleto.nome,
              valor: boleto.valor,
              linhaDigitavel: String(boleto.linha_digitavel),
              loteId: lotesMap.get(boleto.unidade),
            },
          })

          if (!existingBoleto) {
            await tx.boleto.create({
              data: {
                nomeSacado: boleto.nome,
                valor: boleto.valor,
                linhaDigitavel: String(boleto.linha_digitavel),
                loteId: lotesMap.get(boleto.unidade),
              },
            })
          }

          continue
        }

        const existingLote = await tx.lote.findFirst({
          where: {
            nome: String(boleto.unidade),
          },
        })

        if (existingLote) {
          lotesMap.set(existingLote.nome, existingLote.id)

          const existingBoleto = await tx.boleto.findFirst({
            where: {
              nomeSacado: boleto.nome,
              valor: boleto.valor,
              linhaDigitavel: String(boleto.linha_digitavel),
              loteId: existingLote.id,
            },
          })

          if (!existingBoleto) {
            await tx.boleto.create({
              data: {
                nomeSacado: boleto.nome,
                valor: boleto.valor,
                linhaDigitavel: String(boleto.linha_digitavel),
                loteId: existingLote.id,
              },
            })
          }

          continue
        }

        const newLote = await tx.lote.create({
          data: {
            nome: String(boleto.unidade),
          },
        })

        lotesMap.set(newLote.nome, newLote.id)

        const existingBoleto = await tx.boleto.findFirst({
          where: {
            nomeSacado: boleto.nome,
            valor: boleto.valor,
            linhaDigitavel: String(boleto.linha_digitavel),
            loteId: newLote.id,
          },
        })

        if (!existingBoleto) {
          await tx.boleto.create({
            data: {
              nomeSacado: boleto.nome,
              valor: boleto.valor,
              linhaDigitavel: String(boleto.linha_digitavel),
              loteId: newLote.id,
            },
          })
        }
      }
    })
  }
}
