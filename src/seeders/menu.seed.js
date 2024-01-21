import { PrismaClient } from "@prisma/client"
import { logger } from "../app/logging.js"
const prisma = new PrismaClient()

export const menuSeed = async () => {
  logger.info('excecute menu seed seed!')
  await prisma.menu.upsert(
    {
      where : { id : 1 },
      update: {
        id : 1,
        name : "Admin",
        url : 'admin',
        icon : 'bi bi-stack',
      },
      create: {
        id : 1,
        name : "Admin",
        url : 'admin',
        icon : 'bi bi-stack',
      },
    }
  )
  console.log('Admin menu created!')

  await prisma.menu.upsert(
    {
      where : { id : 2 },
      update: {
        id : 2,
        name : "Data",
        url : 'data',
        icon : 'bi bi-stack',
      },
      create: {
        id : 2,
        name : "Data",
        url : 'data',
        icon : 'bi bi-stack',
      },
    }
  )
  console.log('Data menu created!')

  await prisma.menu.upsert(
    {
      where : { id : 3 },
      update: {
        id : 3,
        name : "Me",
        url : 'me',
        icon : 'bi bi-stack',
      },
      create: {
        id : 3,
        name : "Me",
        url : 'me',
        icon : 'bi bi-stack',
      },
    }
  )
  console.log('Me menu created!')
}

