import { PrismaClient } from "@prisma/client"
import { ResponseError } from "../error/response.error.js"
import { logger } from "../app/logging.js"
import { response } from "../helpers/response.helper.js"
const prisma = new PrismaClient()

export const permissionMiddleware = async (req, res, next) => {
  try {
    const user = req.user
    logger.info('user role ' + req.user.roleId)
    if(req.user.roleId === 99) return next()
    let route = req["url"].split("/")[1]
    const check = await prisma.permission.findFirst({
      where: { name: route },
      include: {
        rolePermissions: {
          where: {
            AND: [{ roleId: user.roleId }, { active: 1 }],
          },
        },
      },
    })

    if(check.rolePermissions.length === 0) throw new ResponseError(403, "Permission Denied")
    req.user.permission = check.rolePermissions[0]
    next()
  } catch (error) {
    logger.error('permission denied : ' + error.message)
    return response(res, null, error.message ||  'Internal server error', error.status || 500)
  }
}
