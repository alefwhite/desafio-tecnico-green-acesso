import csvToJson from 'convert-csv-to-json'

import { unlinkSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

import type { MultipartFile } from '@fastify/multipart'
import type { CsvConverter } from '@/contracts/csv'

export class CsvToJson implements CsvConverter {
  async convert(file: MultipartFile): Promise<any[]> {
    const tempFilePath = join(tmpdir(), `${Date.now()}-${file.filename}`)
    writeFileSync(tempFilePath, await file.toBuffer())

    const result = csvToJson
      .fieldDelimiter(';')
      .latin1Encoding()
      .formatValueByType(true)
      .getJsonFromCsv(tempFilePath)

    try {
      unlinkSync(tempFilePath)
    } catch (error) {
      console.error('Erro ao remover arquivo!', error)
    }

    return result
  }
}
