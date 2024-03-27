import { prisma } from "../app/database.js"
import { ResponseError } from "../error/response.error.js"
import { getResultsAndPagination } from "../helpers/common.js"
import { createRoleValidation, findAllRoleValidation, findByIdRoleValidation, removeRoleValidation, updateRoleValidation } from "../validations/role.validation.js"
import { validate } from "../validations/validation.js"
const roleSelect = { id : true, name : true }

const create = async (request) => {
  await validate(createRoleValidation, request)

  const check = await prisma.role.findFirst({
    where : { name : request.name }
  })

  if(check) throw new ResponseError(400, "Role already exists!")

  const save = await prisma.role.create({
    data : { name : request.name },
    select : { id : true, name : true }
  })

  return save
}

const findAll  = async (req) => {
  const { results, pagination } = await getResultsAndPagination(findAllRoleValidation, roleSelect, prisma.role, req)
  return { results, pagination }
}

const findById = async(id) => {
  await validate(findByIdRoleValidation, { id })

  const get = await prisma.role.findFirstOrThrow({
    where : { id : id }
  })

  return get
} 

const update = async(id, request) => {
  await validate(findByIdRoleValidation, { id })
  await validate(updateRoleValidation, request)

  await prisma.role.findUniqueOrThrow({
    select : roleSelect,
    where : { id : id }
  })

  const updatedRole = await prisma.role.update({
    where : { id : id },
    data : { name : request.name },
    select : roleSelect
  })

  return updatedRole
}

const getPermission = async(id) => {
  await validate(findByIdRoleValidation, { id })

  await prisma.role.findFirstOrThrow({
    where : { id : id }
  })

  const permissions = await prisma.permission.findMany({
    distinct: ['subMenuId'],
    where: {
      rolePermissions: {
        some: {
          roleId: id,
        },
      },
    },
  })
  const subMenusId = permissions.map(a => a.subMenuId)
  console.log('roleee', permissions)
  const menus = await prisma.menu.findMany({
    select : {
      id : true,
      name : true,
      childs : {
        select : {
          id : true,
          name : true,
          permission : {
            // where : { subMenuId : { in : subMenusId } },
            select : {
              id : true,
              route : true,
              name : true,
              method : true,
              rolePermissions : {
                select : {
                  id : true,
                  roleId : true,
                  permissionId : true,
                  active : true,
                  canUpdateOthers : true,
                  // createdAt : true,
                  // updatedAt : true
                },
                where : { roleId : id }
              }
            }
          }
        }
      }
    },
    // where: {
    //   childs: {
    //     some: {
    //       id: {
    //         in: subMenusId,
    //       },
    //     },
    //   },
    // },
  })
  // const menus = await prisma.menu.findMany({
  //   include : {
  //     childs : {
  //       where : { id : { in : subMenusId } },
  //       include : {
  //         permission : {
  //           // where : { subMenuId : { in : subMenusId } },
  //           include : {
  //             rolePermissions : {
  //               where : { roleId : id }
  //             }
  //           }
  //         }
  //       }
  //     }
  //   },
  //   where: {
  //     childs: {
  //       some: {
  //         id: {
  //           in: subMenusId,
  //         },
  //       },
  //     },
  //   },
  // })

  return menus
}

const destroy = async(id) => {
  await validate(removeRoleValidation, { id })
  if(id == -1) throw new ResponseError(400, "You can't delete this role")
  await prisma.role.findUniqueOrThrow({
    select : roleSelect,
    where : { id : id }
  })

  await prisma.role.delete({
    where : { id : id }
  })

  return true

}

export default {
  findAll,
  create,
  findById,
  update,
  destroy,
  getPermission,
}