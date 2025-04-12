import { CsvToJson } from '@/utils/csv-to-json'
import { ImportBoletosCsvUseCase } from '../boletos/import-csv'

export const makeImportBoletosCsvUseCase = (): ImportBoletosCsvUseCase => {
  return new ImportBoletosCsvUseCase(new CsvToJson())
}
