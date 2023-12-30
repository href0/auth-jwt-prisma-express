import { logger } from "../app/logging.js"
import { ResponseError } from "../error/response.error.js"
import { response } from "../helpers/response.helper.js"
import jwt from "jsonwebtoken"

export const authMiddleware = async(req, res, next) => {
  try {
    const token = req.headers['authorization'] && req.headers['authorization'].split(" ")[1]
    if(!token) throw new ResponseError(401, "Token not found")
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    req.user = decoded
    logger.info('token verified')
    next()
  } catch (error) {
    logger.error('error jwt : ' + error.message)
    return response(res, null, error.message ||  'Unauthorized', error.status || 401)
  }
}