import { Prisma } from "@prisma/client"
import { prisma } from "../app/database.js"
import { logger } from "../app/logging.js"
import { response } from "../helpers/response.helper.js"

export const getAll = async(req, res, next) => {
  try {
    console.log('req', req.user)
    const getRolePermission = await prisma.permission.findMany({
      distinct: ['subMenuId'],
      where: {
        rolePermissions: {
          some: {
            roleId: req.user.roleId,
          },
        },
      },
    })
    const subMenusId = getRolePermission.map(a => a.subMenuId)
    console.log('roleee', getRolePermission)
    const menus = await prisma.menu.findMany({
      include : {
        childs : {
          where : { id : { in : subMenusId } }
        }
      },
      where: {
        childs: {
          some: {
            id: {
              in: subMenusId,
            },
          },
        },
      },
    })

    return response(res, menus)
  } catch (error) {
    logger.error("error get menu " + error)
    console.log('error get menu', error)
    next()
  }
}