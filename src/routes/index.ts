import type { FastifyInstance, FastifyPluginAsync } from 'fastify'
import { fileRoutes } from './files'

export const setupRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {
  app.get('/health-check', async (_, reply) => {
    return reply.status(200).send({ system_checked: true })
  })

  const globalPrefix = '/api'

  app.register(fileRoutes, { prefix: globalPrefix })
}
