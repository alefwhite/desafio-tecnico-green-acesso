import 'dotenv'

import fastify from 'fastify'
import { setupRoutes } from './routes'
import { errorHandler } from './http/middlewares/error-handler'

const app = fastify()

app.setErrorHandler(errorHandler)
app.register(setupRoutes)

export { app }
