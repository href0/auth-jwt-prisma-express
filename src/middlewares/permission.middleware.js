import { PrismaClient } from "@prisma/client"
import { ResponseError } from "../error/response.error.js"
import { logger } from "../app/logging.js"
import { response } from "../helpers/response.helper.js"
const prisma = new PrismaClient()

export const permissionMiddleware = async (req, res, next) => {
  try {
    const user = req.user
    logger.info('user role ' + req.user.roleId)
    logger.info('rooute ' + req['url'])
    logger.info('method ' + req['method'])
    if(req.user.roleId === 99) return next()

    let route = req["url"].split("/")[1]
    route = route.split('?')[0]
    const method = req['method']

    const check = await prisma.permission.findFirst({
      where: {
        AND : [
          { name: route },
          { method: method },
        ]
      },
      include: {
        rolePermissions: {
          where: {
            AND: [{ roleId: user.roleId }, { active: 1 }],
          },
        },
      },
    })

    if(!check || check.rolePermissions.length === 0) throw new ResponseError(403, "Permission Denied")
    req.user.permission = check.rolePermissions[0]
    next()
  } catch (error) {
    logger.error('permission denied : ' + error)
    return response(res, null, error.message ||  'Internal server error', error.status || 500)
  }
}
