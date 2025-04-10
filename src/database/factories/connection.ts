import { env } from '@/config/env'
import { PrismaConnectionSingleton } from '@/database/prisma/connection'
import type { PrismaClient } from '@prisma/client'

export const makePrismaConnection = (): PrismaClient => {
  return PrismaConnectionSingleton.getInstance(env.NODE_ENV)
}
