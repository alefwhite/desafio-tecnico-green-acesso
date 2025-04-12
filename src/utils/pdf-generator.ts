import PDFDocument from 'pdfkit'
import fs from 'node:fs'
import path from 'node:path'

export function generateBoletosReportPDF(boletos) {
  const doc = new PDFDocument({ margin: 40 })
  const buffers: Buffer[] = []

  const date = new Date()
  const formattedDate = date
    .toLocaleString('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    .replace(/[/:]/g, '-')
    .replace(/, /, '_')
  const fileName = `${formattedDate}.pdf`
  const filePath = path.join('temp', 'relatorios', fileName)

  fs.mkdirSync(path.dirname(filePath), { recursive: true })

  const writeStream = fs.createWriteStream(filePath)
  doc.pipe(writeStream)
  doc.on('data', buffers.push.bind(buffers))

  // Título
  doc
    .fontSize(18)
    .font('Helvetica-Bold')
    .text('Relatório de Boletos', { align: 'center', underline: true })
    .moveDown(2) // aumenta o espaço abaixo do título

  const headers = [
    'Nome Sacado',
    'Valor',
    'Linha Digitável',
    'Ativo',
    'Lote ID',
    'Lote Nome',
  ]

  const columnWidths = [130, 70, 160, 60, 60, 70] // largura customizada
  const rowHeight = 32
  const headerHeight = 34
  const spacing = 0

  const startX = doc.page.margins.left
  let startY = doc.y + 10 // mais espaço antes da tabela

  const drawHeader = () => {
    let currentX = startX
    headers.forEach((header, i) => {
      const width = columnWidths[i]

      doc.rect(currentX, startY, width, headerHeight).fill('#4A148C')

      doc
        .fillColor('white')
        .fontSize(12)
        .font('Helvetica-Bold')
        .text(header, currentX, startY + 10, {
          width,
          align: 'center',
        })

      currentX += width + spacing
    })

    startY += headerHeight
  }

  drawHeader()

  for (const boleto of boletos) {
    const values = [
      boleto.nomeSacado,
      boleto.valor.toFixed(2),
      boleto.linhaDigitavel,
      boleto.ativo ? 'Sim' : 'Não',
      boleto.lote.id.toString(),
      boleto.lote.nome,
    ]

    let currentX = startX

    for (let i = 0; i < values.length; i++) {
      const value = values[i]
      const width = columnWidths[i]

      doc.lineWidth(1).rect(currentX, startY, width, rowHeight).stroke()

      doc
        .fillColor('black')
        .fontSize(11)
        .font('Helvetica')
        .text(value, currentX, startY + 10, {
          width,
          align: 'center',
        })

      currentX += width + spacing
    }

    startY += rowHeight

    // Verifica se precisa de nova página
    if (startY + rowHeight + 40 > doc.page.height - doc.page.margins.bottom) {
      doc.addPage()
      startY = doc.y + 10
      drawHeader()
    }
  }

  doc.end()

  return new Promise<string>(resolve => {
    writeStream.on('finish', () => {
      const pdfData = Buffer.concat(buffers)
      resolve(pdfData.toString('base64'))
    })
  })
}
