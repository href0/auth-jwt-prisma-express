import { PrismaClient } from "@prisma/client"
import { hashBcrypt } from "../helpers/common.js"
import { logger } from "../app/logging.js"

const prisma = new PrismaClient()

export const userSeed = async () => {
  logger.info('excecute user seed!')
  // Superadmin
  await prisma.user.upsert({
    where : { id : 1 },
    update: {
      id        : 1,
      name      : 'Superadmin',
      email     : 'superadmin@gmail.com',
      password  : hashBcrypt("superadmin"),
      roleId    : -1,
      createdAt : new Date().getTime() / 1000,
      updatedAt : new Date().getTime() / 1000
    },
    create: {
      id        : 1,
      name      : 'Superadmin',
      email     : 'superadmin@gmail.com',
      password  : hashBcrypt("superadmin"),
      roleId    : -1,
      createdAt : new Date().getTime() / 1000,
      updatedAt : new Date().getTime() / 1000
    },
  })

  // admin
  await prisma.user.upsert({
    where : { id : 2 },
    update: {
      id        : 2,
      name      : 'admin',
      email     : 'admin@gmail.com',
      password  : hashBcrypt("admin"),
      roleId    : 1,
      createdAt : new Date().getTime() / 1000,
      updatedAt : new Date().getTime() / 1000
    },
    create: {
      id        : 2,
      name      : 'admin',
      email     : 'admin@gmail.com',
      password  : hashBcrypt("admin"),
      roleId    : 1,
      createdAt : new Date().getTime() / 1000,
      updatedAt : new Date().getTime() / 1000
    },
  })

  // user
  await prisma.user.upsert({
    where : { id : 3 },
    update: {
      id        : 3,
      name      : 'user',
      email     : 'user@gmail.com',
      password  : hashBcrypt("user"),
      roleId    : 2,
      createdAt : new Date().getTime() / 1000,
      updatedAt : new Date().getTime() / 1000
    },
    create: {
      id        : 3,
      name      : 'user',
      email     : 'user@gmail.com',
      password  : hashBcrypt("user"),
      roleId    : 2,
      createdAt : new Date().getTime() / 1000,
      updatedAt : new Date().getTime() / 1000
    },
  })
}

