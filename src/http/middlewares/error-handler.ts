import { env } from '@/config/env'
import { BaseError } from '@/contracts/base-error'
import type { FastifyInstance } from 'fastify'

type FastifyErrorHandler = FastifyInstance['errorHandler']

function isErrorBaseError(error: unknown): error is BaseError {
  return error instanceof BaseError
}

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // HERE WE SHOULD LOG TO AN EXTERNAL TOOL LIKE DataDog/NewRelic/Sentry
  }

  if (isErrorBaseError(error)) {
    return reply.status(error.statusCode).send({
      error: 'An error occurred',
      message: error.message,
      details: error.details,
    })
  }

  return reply.status(500).send({ message: 'Internal server error!' })
}
