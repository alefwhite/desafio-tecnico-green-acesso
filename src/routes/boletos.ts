import type { FastifyInstance } from 'fastify'
import {
  importBoletosCsv,
  importBoletosPdf,
  get,
} from '@/http/controllers/boletos'

export async function boletosRoutes(app: FastifyInstance) {
  app.register(import('@fastify/multipart'))

  app.get('/boletos', get)
  app.post('/boletos/pdf', importBoletosPdf)
  app.post('/boletos/csv', importBoletosCsv)
}
