import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const permissionSeed = async () => {
  await prisma.permission.upsert({
    where : { id : 1 },
    update: {},
    create: {
      id        : 1,
      name      : 'user',
    },
  })
}

