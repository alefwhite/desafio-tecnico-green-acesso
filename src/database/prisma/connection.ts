import { PrismaClient } from '@prisma/client/extension'

export class PrismaConnectionSingleton {
  private static instance: PrismaConnectionSingleton
  private prisma: PrismaClient

  private constructor(url: string, environment: string) {
    this.prisma = new PrismaClient({
      datasources: {
        db: {
          url,
        },
      },
      log: ['development', 'test'].includes(environment) ? ['query'] : [],
    })
  }

  public static getInstance(url: string, environment: string): PrismaClient {
    if (!PrismaConnectionSingleton.instance) {
      PrismaConnectionSingleton.instance = new PrismaConnectionSingleton(
        url,
        environment
      )
    }
    return PrismaConnectionSingleton.instance.prisma
  }
}
