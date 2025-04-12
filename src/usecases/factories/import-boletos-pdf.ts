import { ImportBoletosPdfUseCase } from '../boletos/import-pdf'

export const makeImportBoletosPdfUseCase = (): ImportBoletosPdfUseCase => {
  return new ImportBoletosPdfUseCase()
}
