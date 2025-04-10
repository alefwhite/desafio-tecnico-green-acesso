import { PrismaClient } from '@prisma/client'

export class PrismaConnectionSingleton {
  private static instance: PrismaConnectionSingleton
  private prisma: PrismaClient

  private constructor(environment: string) {
    this.prisma = new PrismaClient({
      log: ['development', 'test'].includes(environment) ? ['query'] : [],
    })
  }

  public static getInstance(environment: string): PrismaClient {
    if (!PrismaConnectionSingleton.instance) {
      PrismaConnectionSingleton.instance = new PrismaConnectionSingleton(
        environment
      )
    }
    return PrismaConnectionSingleton.instance.prisma
  }
}
