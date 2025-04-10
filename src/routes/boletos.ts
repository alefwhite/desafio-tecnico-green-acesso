import type { FastifyInstance } from 'fastify'
import { PDFDocument } from 'pdf-lib'
import * as fs from 'node:fs'
import * as path from 'node:path'
import { makePrismaConnection } from '@/database/factories/connection'
import { importBoletos } from '@/http/controllers/boletos/import-boletos'

export async function boletosRoutes(app: FastifyInstance) {
  app.register(import('@fastify/multipart'))

  app.post('/boletos/pdf', async (request, reply) => {
    const prisma = makePrismaConnection()

    const data = await request.file()

    if (!data) {
      return reply.status(400).send({ error: 'Nenhum arquivo enviado' })
    }

    if (data.mimetype !== 'application/pdf') {
      return reply.status(400).send({ error: 'Arquivo deve ser um PDF' })
    }

    // Ler o arquivo PDF
    const buffer = await data.toBuffer()
    const pdfDoc = await PDFDocument.load(buffer)

    // Obter todos os boletos do banco de dados
    const boletos = await prisma.boleto.findMany({
      orderBy: { id: 'asc' },
    })

    if (boletos.length !== pdfDoc.getPageCount()) {
      return reply.status(400).send({
        error: `O número de páginas no PDF (${pdfDoc.getPageCount()}) não corresponde ao número de boletos no banco (${boletos.length})`,
      })
    }

    // Criar diretório para os PDFs individuais
    const outputDir = path.join(process.cwd(), 'temp', 'files', 'boletos')
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
    }

    return reply.status(200).send({
      message: `PDF desmembrado com sucesso. ${pdfDoc.getPageCount()} arquivos criados em ${outputDir}`,
    })
  })

  app.post('/boletos/extract', importBoletos)
}
