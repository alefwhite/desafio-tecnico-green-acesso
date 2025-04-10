import { env } from '@/config/env'
import type { FastifyInstance } from 'fastify'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // HERE WE SHOULD LOG TO AN EXTERNAL TOOL LIKE DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error!' })
}
