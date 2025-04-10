import { CsvToJson } from '@/utils/csv-to-json'
import { ImportBoletoUseCase } from '../boletos/import-boletos'
import { makePrismaConnection } from '@/database/factories/connection'

export const makeImportBoletosUseCase = (): ImportBoletoUseCase => {
  return new ImportBoletoUseCase(new CsvToJson())
}
