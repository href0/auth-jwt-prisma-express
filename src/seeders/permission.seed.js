import { PrismaClient } from "@prisma/client"
import { logger } from "../app/logging.js"
const prisma = new PrismaClient()

export const permissionSeed = async () => {
  logger.info('excecute permission seed!')
  await prisma.permission.upsert(
    {
      where : { id : 1 },
      update: {
          name      : 'user',
          method    : "GET"
      },
      create: {
        id        : 1,
        name      : 'user',
        method    : "GET"
      },
    }
  )

  await prisma.permission.upsert(
    {
      where : { id : 2 },
      update: {
          name      : 'user',
          method    : "POST"
      },
      create: {
        id        : 2,
        name      : 'user',
        method    : "POST"
      },
    }
  )
  await prisma.permission.upsert(
    {
      where : { id : 3 },
      update: {
          name      : 'user',
          method    : "PUT"
      },
      create: {
        id        : 3,
        name      : 'user',
        method    : "PUT"
      },
    }
  )
  await prisma.permission.upsert(
    {
      where : { id : 4 },
      update: {
          name      : 'user',
          method    : "PATCH"
      },
      create: {
        id        : 4,
        name      : 'user',
        method    : "PATCH"
      },
    }
  )
  await prisma.permission.upsert(
    {
      where : { id : 5 },
      update: {
          name      : 'user',
          method    : "DELETE"
      },
      create: {
        id        : 5,
        name      : 'user',
        method    : "DELETE"
      },
    }
  )
}

