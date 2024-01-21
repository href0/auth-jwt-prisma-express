import { PrismaClient } from "@prisma/client"
import { logger } from "../app/logging.js"
const prisma = new PrismaClient()

export const subMenuSeed = async () => {
  logger.info('excecute sub menu seed!')
  await adminSubMenu()
  await dataSubMenu()
  await meSubMenu()
}

const adminSubMenu = async () =>{
  await prisma.subMenu.upsert(
    {
      where : { id : 1 },
      update: {
        id : 1,
        menuId : 1,
        name : "User",
        url : 'user',
        icon : 'bi bi-stack',
      },
      create: {
        id : 1,
        menuId : 1,
        name : "User",
        url : 'user',
        icon : 'bi bi-stack',
      },
    }
  )
  console.log('Sub menu User created!')

  await prisma.subMenu.upsert(
    {
      where : { id : 5 },
      update: {
        id : 5,
        menuId : 1,
        name : "Role",
        url : 'role',
        icon : 'bi bi-stack',
      },
      create: {
        id : 5,
        menuId : 1,
        name : "Role",
        url : 'role',
        icon : 'bi bi-stack',
      },
    }
  )
  console.log('Sub menu Role created!')

  await prisma.subMenu.upsert(
    {
      where : { id : 6 },
      update: {
        id : 6,
        menuId : 1,
        name : "Role Permission",
        url : 'role-permission',
        icon : 'bi bi-stack',
      },
      create: {
        id : 6,
        menuId : 1,
        name : "Role Permission",
        url : 'role-permission',
        icon : 'bi bi-stack',
      },
    }
  )
  console.log('Sub menu Role Permission created!')
}

const dataSubMenu = async() => {
  await prisma.subMenu.upsert(
    {
      where : { id : 2 },
      update: {
        id : 2,
        menuId : 2,
        name : "Product",
        url : 'product',
        icon : 'bi bi-stack',
      },
      create: {
        id : 2,
        menuId : 2,
        name : "Product",
        url : 'product',
        icon : 'bi bi-stack',
      },
    }
  )
  console.log('Sub menu Product created!')
}

const meSubMenu = async () => {
  await prisma.subMenu.upsert(
    {
      where : { id : 3 },
      update: {
        id : 3,
        menuId : 3,
        name : "Profile",
        url : 'profile',
        icon : 'bi bi-stack',
      },
      create: {
        id : 3,
        menuId : 3,
        name : "Profile",
        url : 'profile',
        icon : 'bi bi-stack',
      },
    }
  )
  console.log('Sub menu Profile created!')

  await prisma.subMenu.upsert(
    {
      where : { id : 4 },
      update: {
        id : 4,
        menuId : 3,
        name : "Change Password",
        url : 'change-password',
        icon : 'bi bi-stack',
      },
      create: {
        id : 4,
        menuId : 3,
        name : "Change Password",
        url : 'change-password',
        icon : 'bi bi-stack',
      },
    }
  )
  console.log('Sub menu Change password created!')
}
