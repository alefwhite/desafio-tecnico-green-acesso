import { env } from '@/config/env'
import { PrismaConnectionSingleton } from '@/database/prisma/connection'
import type { PrismaClient } from '@prisma/client/extension'

function makePrismaConnection(): PrismaClient {
  return PrismaConnectionSingleton.getInstance('file:./dev.db', env.NODE_ENV)
}

export { makePrismaConnection }
