import { PrismaClient } from "@prisma/client"
import { ResponseError } from "../error/response.error.js"
import { logger } from "../app/logging.js"
import { response } from "../helpers/response.helper.js"
const prisma = new PrismaClient()

export const permissionMiddleware = async (req, res, next) => {
  try {
    logger.info('user role ' + req.user.roleId)
    logger.info('rooute ' + req['originalUrl'])
    logger.info('method ' + req['method'])

    if(req.user.roleId === 99) return next()
    
    const user = req.user
    const method = req['method']
    const urlSegment = req["originalUrl"].split('/').filter(segment => segment !== "")
    // console.log('urlsegment', urlSegment)
    const permission = await getPermission(urlSegment, method, user.roleId)
    if(!permission) throw new ResponseError(403, "Access Denied")
    // console.log('permission', permission)
    req.user.permission = permission
    next()
  } catch (error) {
    console.log('error ', error)
    logger.error('access denied : ' + error)
    return response(res, null, error.message ||  'Internal server error', error.status || 500)
  }
}

const getPermission = async(pathSegments, method, roleId) => {
  console.log('get permission', pathSegments)
  let result = null
  for (let i = pathSegments.length - 1; i >= 0; i--) {
      const segment = processSegment(pathSegments, i);
      console.log('segment', segment)
      console.log('method', method)
      const permission = await prisma.permission.findFirst({
        where : {
          AND : [
            { route : segment },
            { method : method }
          ]
        },
        include : {
          rolePermissions : {
            where : {
              AND: [{ roleId: roleId }, { active: 1 }],
            }
          }
        }
      })
      // console.log('permission ', permission)
      if(permission && permission.rolePermissions.length > 0) {
        result = permission.rolePermissions[0]
        break
      }
      // if(!permission || permission.rolePermissions.length === 0) throw new ResponseError(403, "Access Denied")
      
  }
  return result
}

const processSegment = (pathSegments, index) => {
  let segment = pathSegments.slice(0, index + 1).join("/")
  if(segment.includes('?')) {
    segment = segment.split('?')[0]
  }
  return segment
}
