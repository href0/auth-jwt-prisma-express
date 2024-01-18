import { PrismaClient } from "@prisma/client"
import { logger } from "../app/logging.js"
const prisma = new PrismaClient()

export const roleSeed = async () => {
  logger.info('excecute role seed!')
  // superadmin => can access all permissions
  await prisma.role.upsert({
    where : { id : 99 },
    update: {},
    create: {
      id: 99,
      name: 'Superadmin',
    },
  })

  // admin
  await prisma.role.upsert({
    where : { id : 1 },
    update: {},
    create: {
      id: 1,
      name: 'Admin',
    },
  })

  // user
  await prisma.role.upsert({
    where : { id : 2 },
    update: {},
    create: {
      id: 2,
      name: 'User',
    },
  })
}

