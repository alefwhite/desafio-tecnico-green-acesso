import type { MultipartFile } from '@fastify/multipart'
import { makePrismaConnection } from '@/database/factories/connection'
import type { PrismaClient } from '@prisma/client/extension'
import * as fs from 'node:fs'
import * as path from 'node:path'
import * as os from 'node:os'
import * as pdfParse from 'pdf-parse'

interface BoletoData {
  nomeSacado: string
  valor: number
  linhaDigitavel: string
  unidade: number
}

interface ImportPdfBoletoDTO {
  file: MultipartFile
}

export class ImportPdfBoletoUseCase {
  constructor(private readonly prisma: PrismaClient = makePrismaConnection()) {}

  async execute({ file }: ImportPdfBoletoDTO): Promise<void> {
    // limpar arquivo temporario
    // fs.unlinkSync(tempFilePath)
  }
}
