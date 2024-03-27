import { ValidationError } from "yup"
import { ResponseError } from "../error/response.error.js"
import { logger } from "../app/logging.js"
import { Prisma } from "@prisma/client"
import { errorPrisma } from "../helpers/common.js"

export const errorMiddleware = async(err, req, res, next) =>{
  if(!err) next()
  // logger.error(`error : ${JSON.stringify(err)}`)
  console.log(err)
  logger.error(`error caught : ${err.message}`)
  if(err instanceof ResponseError) {
    return res.status(err.status).json({
      statusCode : err.status,
      message    : err.message,
      data       : err.data || null
    })
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const { statusCode , message } = errorPrisma(err)
    return res.status(statusCode).json({
      statusCode : statusCode,
      message    : message,
      data       : err.errors || null
    })
  } else if (err instanceof ValidationError){
    return res.status(400).json({
      statusCode : 400,
      message    : "Validation Error",
      data       : err.errors
    })
  } else {
    return res.status(500).json({
      statusCode : 500,
      message    : "Internal server error",
      data       : null
    })
  }
}