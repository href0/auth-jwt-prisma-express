import { PrismaClient } from "@prisma/client"
import { logger } from "../app/logging.js"
const prisma = new PrismaClient()

export const permissionSeed = async () => {
  logger.info("excecute permission seed!")
  await permissionForAdminMenu()
  await permissionForDataMenu()
  await permissionForMeMenu()
  await prisma.permission.upsert({
    where: { id: 4 },
    update: {
      subMenuId: 4,
      route: "user/change-password",
      method: "PATCH",
      name : "Change Password"
    },
    create: {
      id: 4,
      subMenuId: 4,
      route: "user/change-password",
      method: "PATCH",
      name : "Change Password"
    },
  })


}

const permissionForAdminMenu = async() => {
  /* USER */
  await prisma.permission.upsert({
    where: { id: 1 },
    update: {
      subMenuId: 1,
      route: "user",
      method: "GET",
      name : "View"
    },
    create: {
      id: 1,
      subMenuId: 1,
      route: "user",
      method: "GET",
      name : "View"
    },
  })
  console.log('Permission for Admin - User GET created!')

  await prisma.permission.upsert({
    where: { id: 2 },
    update: {
      subMenuId: 1,
      route: "user",
      method: "POST",
      name : "Create"
    },
    create: {
      id: 2,
      subMenuId: 1,
      route: "user",
      method: "POST",
      name : "Create"
    },
  })
  console.log('Permission for Admin - User POST created!')

  await prisma.permission.upsert({
    where: { id: 3 },
    update: {
      subMenuId: 1,
      route: "user",
      method: "PUT",
      name: "Edit"
    },
    create: {
      id: 3,
      subMenuId: 1,
      route: "user",
      method: "PUT",
      name: "Edit"
    },
  })
  console.log('Permission for Admin - User PUT created!')

  await prisma.permission.upsert({
    where: { id: 5 },
    update: {
      subMenuId: 1,
      route: "user",
      method: "DELETE",
      name : "Delete"
    },
    create: {
      id: 5,
      subMenuId: 1,
      route: "user",
      method: "DELETE",
      name : "Delete"
    },
  })
  console.log('Permission for Admin - User DELETE created!')
  /* USER */

  /* ROLE */
  await prisma.permission.upsert({
    where: { id: 13 },
    update: {
      subMenuId: 5,
      route: "role",
      method: "GET",
      name : "View"
    },
    create: {
      id: 13,
      subMenuId: 5,
      route: "role",
      method: "GET",
      name : "View"
    },
  })
  console.log('Permission for Admin - Role GET created!')

  await prisma.permission.upsert({
    where: { id: 14 },
    update: {
      subMenuId: 5,
      route: "role",
      method: "POST",
      name : "Create"
    },
    create: {
      id: 14,
      subMenuId: 5,
      route: "role",
      method: "POST",
      name : "Create"
    },
  })
  console.log('Permission for Admin - Role POST created!')

  await prisma.permission.upsert({
    where: { id: 15 },
    update: {
      subMenuId: 5,
      route: "role",
      method: "PUT",
      name: "Edit"
    },
    create: {
      id: 15,
      subMenuId: 5,
      route: "role",
      method: "PUT",
      name: "Edit"
    },
  })
  console.log('Permission for Admin - Role PUT created!')

  await prisma.permission.upsert({
    where: { id: 16 },
    update: {
      subMenuId: 5,
      route: "role",
      method: "DELETE",
      name : "Delete"
    },
    create: {
      id: 16,
      subMenuId: 5,
      route: "role",
      method: "DELETE",
      name : "Delete"
    },
  })
  console.log('Permission for Admin - Role DELETE created!')
  /* ROLE */
}

const permissionForDataMenu = async() => {
  /* PRODUCT */
  await prisma.permission.upsert({
    where: { id: 6 },
    update: {
      subMenuId: 2,
      route: "product",
      method: "GET",
      name : "View"
    },
    create: {
      id: 6,
      subMenuId: 2,
      route: "product",
      method: "GET",
      name : "View"
    },
  })
  console.log('Permission for Data - Product GET created!')

  await prisma.permission.upsert({
    where: { id: 7 },
    update: {
      subMenuId: 2,
      route: "product",
      method: "POST",
      name : "Create"
    },
    create: {
      id: 7,
      subMenuId: 2,
      route: "product",
      method: "POST",
      name : "Create"
    },
  })
  console.log('Permission for Data - Product POST created!')

  await prisma.permission.upsert({
    where: { id: 8 },
    update: {
      subMenuId: 2,
      route: "product",
      method: "PUT",
      name : "Edit"
    },
    create: {
      id: 8,
      subMenuId: 2,
      route: "product",
      method: "PUT",
      name : "Edit"
    },
  })
  console.log('Permission for Data - Product PUT created!')

  await prisma.permission.upsert({
    where: { id: 9 },
    update: {
      subMenuId: 2,
      route: "product",
      method: "DELETE",
      name : "Delete"
    },
    create: {
      id: 9,
      subMenuId: 2,
      route: "product",
      method: "DELETE",
      name : "Delete"
    },
  })
  console.log('Permission for Data - Product DELETE created!')
  /* PRODUCT */
}

const permissionForMeMenu = async() => {
  /* PROFILE */
  await prisma.permission.upsert({
    where: { id: 10 },
    update: {
      subMenuId: 3,
      route: "me",
      method: "GET",
      name : "View"
    },
    create: {
      id: 10,
      subMenuId: 3,
      route: "me",
      method: "GET",
      name : "View"
    },
  })
  console.log('Permission for Me - Profile GET created!')

  await prisma.permission.upsert({
    where: { id: 12 },
    update: {
      subMenuId: 3,
      route: "me",
      method: "PUT",
      name : "Edit"
    },
    create: {
      id: 12,
      subMenuId: 3,
      route: "me",
      method: "PUT",
      name : "Edit"
    },
  })
  console.log('Permission for Me - Profile PUT created!')
  /* PROFILE */

  /* CHANGE PASSWORD */
  await prisma.permission.upsert({
    where: { id: 11 },
    update: {
      subMenuId: 4,
      route: "me/change-password",
      method: "PATCH",
      name : "Change Password"
    },
    create: {
      id: 11,
      subMenuId: 4,
      route: "me/change-password",
      method: "PATCH",
      name : "Change Password"
    },
  })
  console.log('Permission for Me - Profile PATCH created!')
  /* CHANGE PASSWORD */
}
