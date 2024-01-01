import { ValidationError } from "yup"
import { ResponseError } from "../error/response.error.js"
import { logger } from "../app/logging.js"
import { NotFoundError } from "@prisma/client/runtime/library.js"

export const errorMiddleware = async(err, req, res, next) =>{
  if(!err) next()
  logger.error(`error : ${err instanceof NotFoundError }`)
  logger.error(`error caught : ${err.message}`)
  if(err instanceof ResponseError) {
    return res.status(err.status).json({
      statusCode : err.status,
      message    : err.message,
      data       : null
    })
  } else if (err instanceof NotFoundError) {
    return res.status(404).json({
      statusCode : 404,
      message    : err.message,
      data       : null
    })
  } else if (err instanceof ValidationError){
    return res.status(400).json({
      statusCode : 400,
      message    : err.errors,
      data       : null
    })
  } 
  else {
    return res.status(500).json({
      statusCode : 500,
      message    : "Internal server error",
      data       : null
    })
  }
  
}