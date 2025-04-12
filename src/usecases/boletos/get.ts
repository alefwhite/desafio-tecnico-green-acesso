import { makePrismaConnection } from '@/database/factories/connection'

type FilterDTO = {
  nome?: string
  valorInicial?: string
  valorFinal?: string
  loteId?: string
}

export class GetBoletosUseCase {
  constructor(private readonly prisma = makePrismaConnection()) {}

  async execute(filter: FilterDTO) {
    const boletos = await this.prisma.boleto.findMany({
      select: {
        id: true,
        nomeSacado: true,
        valor: true,
        linhaDigitavel: true,
        ativo: true,
        criadoEm: true,
        lote: {
          select: {
            id: true,
            nome: true,
            ativo: true,
          },
        },
      },
      where: {
        AND: [
          filter.nome ? { nomeSacado: { contains: filter.nome } } : {},
          filter.valorInicial
            ? { valor: { gte: Number(filter.valorInicial) } }
            : {},
          filter.valorFinal
            ? { valor: { lte: Number(filter.valorFinal) } }
            : {},
          filter.loteId ? { loteId: Number(filter.loteId) } : {},
        ],
      },
    })

    return boletos.map(boleto => ({ ...boleto, valor: Number(boleto.valor) }))
  }
}
