import { BaseError } from '@/contracts/base-error'

export class BoletosCountInvalidError extends BaseError {
  constructor(pdfCount: number, boletosCount: number) {
    super(
      `O número de páginas no PDF (${pdfCount}) não corresponde ao número de boletos no banco (${boletosCount})`,
      400
    )
    this.name = 'BoletosCountInvalidError'
  }
}
