import { PrismaClient } from "@prisma/client"
import { logger } from "../app/logging.js"
const prisma = new PrismaClient()

export const rolePermissionSeed = async () => {
  logger.info("excecute role permission seed!")
  await rolePermissionAdmin()
  await rolePermissionUser()
}

const rolePermissionAdmin = async () => {
  const roleId = 1
  const now = new Date().getTime() / 1000
  /* USER */
  await prisma.rolePermission.upsert({
    where: { id: 1 },
    update: {
      roleId: 1, // Admin
      permissionId: 1, // USER - GET
      active: 1,
      canUpdateOthers: 1,
      createdAt: now,
      updatedAt: now,
    },
    create: {
      id: 1,
      roleId: 1, // Admin
      permissionId: 1, // USER - GET
      active: 1,
      canUpdateOthers: 1,
      createdAt: now,
      updatedAt: now,
    },
  })
  console.log("Role Admin permission for permission USER - GET created!")

  await prisma.rolePermission.upsert({
    where: { id: 2 },
    update: {
      roleId: 1, // USER
      permissionId: 2, // USER - POST
      active: 1,
      canUpdateOthers: 1,
      createdAt: now,
      updatedAt: now,
    },
    create: {
      id: 2,
      roleId: 1, // USER
      permissionId: 2, // POST
      active: 1,
      canUpdateOthers: 1,
      createdAt: now,
      updatedAt: now,
    },
  })
  console.log("Role Admin permission for permission USER - POST created!")

  await prisma.rolePermission.upsert({
    where: { id: 15 },
    update: {
      roleId: 1,
      permissionId: 3,
      active: 1,
      canUpdateOthers: 1,
      createdAt: now,
      updatedAt: now,
    },
    create: {
      id: 15,
      roleId: 1,
      permissionId: 3,
      active: 1,
      canUpdateOthers: 1,
      createdAt: now,
      updatedAt: now,
    },
  })
  console.log("Role Admin permission for permission USER - PUT created!")
  /* USER */

  /* PROFILE */
  await prisma.rolePermission.upsert({
    where: { id: 5 },
    update: {
      roleId: roleId,
      permissionId: 10,
      active: 1,
      canUpdateOthers: 0,
      createdAt: now,
      updatedAt: now,
    },
    create: {
      id: 5,
      roleId: roleId,
      permissionId: 10,
      active: 1,
      canUpdateOthers: 0,
      createdAt: now,
      updatedAt: now,
    },
  })
  console.log("Role Admin permission for permission Profile - GET created!")
  /* PROFILE */

  /* CHANGE PASSWORD */
  await prisma.rolePermission.upsert({
    where: { id: 6 },
    update: {
      roleId: roleId,
      permissionId: 11,
      active: 1,
      canUpdateOthers: 0,
      createdAt: now,
      updatedAt: now,
    },
    create: {
      id: 6,
      roleId: roleId,
      permissionId: 11,
      active: 1,
      canUpdateOthers: 0,
      createdAt: now,
      updatedAt: now,
    },
  })
  console.log("Role Admin permission for permission Change Password - PATCH created!")
  /* CHANGE PASSWORD */

  await rolePermissionProduct(roleId, "Admin", [7, 8, 9, 10])

  /* Role */
  await prisma.rolePermission.upsert({
    where: { id: 16 },
    update: {
      roleId: 1, // Admin
      permissionId: 13, // USER - GET
      active: 1,
      canUpdateOthers: 1,
      createdAt: now,
      updatedAt: now,
    },
    create: {
      id: 16,
      roleId: 1, // Admin
      permissionId: 13, // USER - GET
      active: 1,
      canUpdateOthers: 1,
      createdAt: now,
      updatedAt: now,
    },
  })
  console.log("Role Admin permission for permission ROLE - GET created!")

  await prisma.rolePermission.upsert({
    where: { id: 17 },
    update: {
      roleId: 1, // USER
      permissionId: 14, // USER - POST
      active: 1,
      canUpdateOthers: 1,
      createdAt: now,
      updatedAt: now,
    },
    create: {
      id: 17,
      roleId: 1, // USER
      permissionId: 14, // POST
      active: 1,
      canUpdateOthers: 1,
      createdAt: now,
      updatedAt: now,
    },
  })
  console.log("Role Admin permission for permission ROLE - POST created!")

  await prisma.rolePermission.upsert({
    where: { id: 18 },
    update: {
      roleId: 1,
      permissionId: 15,
      active: 1,
      canUpdateOthers: 1,
      createdAt: now,
      updatedAt: now,
    },
    create: {
      id: 18,
      roleId: 1,
      permissionId: 15,
      active: 1,
      canUpdateOthers: 1,
      createdAt: now,
      updatedAt: now,
    },
  })
  console.log("Role Admin permission for permission ROLE - PUT created!")

  await prisma.rolePermission.upsert({
    where: { id: 19 },
    update: {
      roleId: 1,
      permissionId: 16,
      active: 1,
      canUpdateOthers: 1,
      createdAt: now,
      updatedAt: now,
    },
    create: {
      id: 19,
      roleId: 1,
      permissionId: 16,
      active: 1,
      canUpdateOthers: 1,
      createdAt: now,
      updatedAt: now,
    },
  })
  console.log("Role Admin permission for permission ROLE - DELETE created!")
  /* Role */
}

const rolePermissionUser = async () => {
  const roleId = 2
  const now = new Date().getTime() / 1000
  /* PROFILE */
  await prisma.rolePermission.upsert({
    where: { id: 3 },
    update: {
      roleId: roleId,
      permissionId: 10,
      active: 1,
      canUpdateOthers: 0,
      createdAt: now,
      updatedAt: now,
    },
    create: {
      id: 3,
      roleId: roleId,
      permissionId: 10,
      active: 1,
      canUpdateOthers: 0,
      createdAt: now,
      updatedAt: now,
    },
  })
  console.log("Role User permission for permission Profile - GET created!")
  /* PROFILE */

  /* CHANGE PASSWORD */
  await prisma.rolePermission.upsert({
    where: { id: 4 },
    update: {
      roleId: roleId,
      permissionId: 11,
      active: 1,
      canUpdateOthers: 0,
      createdAt: now,
      updatedAt: now,
    },
    create: {
      id: 4,
      roleId: roleId,
      permissionId: 11,
      active: 1,
      canUpdateOthers: 0,
      createdAt: now,
      updatedAt: now,
    },
  })
  console.log("Role User permission for permission Change Password - PATCH created!")
  /* CHANGE PASSWORD */

  await rolePermissionProduct(roleId, "User", [11, 12, 13, 14])
}

const rolePermissionProduct = async (roleId, roleName, id) => {
  const now = new Date().getTime() / 1000
  await prisma.rolePermission.upsert({
    where: { id: id[0] },
    update: {
      roleId: roleId,
      permissionId: 6,
      active: 1,
      canUpdateOthers: 0,
      createdAt: now,
      updatedAt: now,
    },
    create: {
      id: id[0],
      roleId: roleId,
      permissionId: 6,
      active: 1,
      canUpdateOthers: 0,
      createdAt: now,
      updatedAt: now,
    },
  })
  console.log(`Role ${roleName} permission for permission Product - GET created!`)

  await prisma.rolePermission.upsert({
    where: { id: id[1] },
    update: {
      roleId: roleId,
      permissionId: 7,
      active: 1,
      canUpdateOthers: 0,
      createdAt: now,
      updatedAt: now,
    },
    create: {
      id: id[1],
      roleId: roleId,
      permissionId: 7,
      active: 1,
      canUpdateOthers: 0,
      createdAt: now,
      updatedAt: now,
    },
  })
  console.log(`Role ${roleName} permission for permission Product - POST created!`)

  await prisma.rolePermission.upsert({
    where: { id: id[2] },
    update: {
      roleId: roleId,
      permissionId: 8,
      active: 1,
      canUpdateOthers: 0,
      createdAt: now,
      updatedAt: now,
    },
    create: {
      id: id[2],
      roleId: roleId,
      permissionId: 8,
      active: 1,
      canUpdateOthers: 0,
      createdAt: now,
      updatedAt: now,
    },
  })
  console.log(`Role ${roleName} permission for permission Product - PUT created!`)

  await prisma.rolePermission.upsert({
    where: { id: id[3] },
    update: {
      roleId: roleId,
      permissionId: 9,
      active: 1,
      canUpdateOthers: 0,
      createdAt: now,
      updatedAt: now,
    },
    create: {
      id: id[3],
      roleId: roleId,
      permissionId: 9,
      active: 1,
      canUpdateOthers: 0,
      createdAt: now,
      updatedAt: now,
    },
  })
  console.log(`Role ${roleName} permission for permission Product - DELETE created!`)
}
