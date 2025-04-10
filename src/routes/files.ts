import type { FastifyInstance } from 'fastify'

export async function fileRoutes(app: FastifyInstance) {
  app.register(import('@fastify/multipart'))
}
