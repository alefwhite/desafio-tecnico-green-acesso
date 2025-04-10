import type { MultipartFile } from '@fastify/multipart'

type BoletoArray = Array<{
  nome: string
  unidade: number
  valor: number
  linha_digitavel: number
}>

export interface CsvConverter {
  convert(input: MultipartFile): Promise<BoletoArray>
}
