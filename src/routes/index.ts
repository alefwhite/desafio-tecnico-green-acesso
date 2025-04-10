import type { FastifyInstance, FastifyPluginAsync } from 'fastify'
import { boletosRoutes } from './boletos'

export const setupRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {
  app.get('/health-check', async (_, reply) => {
    return reply.status(200).send({ system_checked: true })
  })

  const globalPrefix = '/api'

  app.register(boletosRoutes, { prefix: globalPrefix })
}
