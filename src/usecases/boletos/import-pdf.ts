import type { MultipartFile } from '@fastify/multipart'
import { makePrismaConnection } from '@/database/factories/connection'
import * as fs from 'node:fs'
import * as path from 'node:path'
import { PDFDocument } from 'pdf-lib'

interface ImportPdfBoletoDTO {
  file: MultipartFile
}

export class ImportBoletosPdfUseCase {
  constructor(private readonly prisma = makePrismaConnection()) {}

  async execute({ file }: ImportPdfBoletoDTO): Promise<void> {
    // Ler o arquivo PDF
    const buffer = await file.toBuffer()
    const pdfDoc = await PDFDocument.load(buffer)

    // Obter todos os boletos do banco de dados
    const boletos = await this.prisma.boleto.findMany({
      orderBy: { id: 'asc' },
    })

    if (boletos.length !== pdfDoc.getPageCount()) {
      throw new Error(
        `O número de páginas no PDF (${pdfDoc.getPageCount()}) não corresponde ao número de boletos no banco (${boletos.length})`
      )
    }

    // Criar diretório para os PDFs individuais
    const outputDir = path.join(process.cwd(), 'temp', 'boletos')
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    // Extrair cada página e salvar como um PDF separado
    for (let i = 0; i < pdfDoc.getPageCount(); i++) {
      // Criar um novo documento PDF
      const newPdfDoc = await PDFDocument.create()

      // Copiar a página do documento original
      const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [i])
      newPdfDoc.addPage(copiedPage)

      // Salvar o PDF
      const pdfBytes = await newPdfDoc.save()
      const boletoId = boletos[i].id
      const outputPath = path.join(outputDir, `${boletoId}.pdf`)

      fs.writeFileSync(outputPath, pdfBytes)
      // limpar arquivo temporario
      // fs.unlinkSync(outputDir)
    }
  }
}
