import { logger } from "../app/logging.js"
import { ResponseError } from "../error/response.error.js"
import { addLinksToPagination } from "../helpers/common.js"
import { response } from "../helpers/response.helper.js"
import userService from "../services/user.service.js"

export const create = async(req, res, next) => {
  try {
    const save = await userService.create(req.body)

    return response(res, save)
  } catch (error) {
    logger.error(`error create user ${error}`)
    next(error)
  }
}

export const getAll = async (req, res, next) => {
  try {
    const baseUrl = req['protocol'] + '://' + req.headers['host'] + req['baseUrl'] + '?'
    let curentUrl = req['_parsedUrl']['query']
    if(!curentUrl) {
      curentUrl = `page=${req.query.page}&perPage=${req.query.perPage}`
    }

    let { pagination, users } = await userService.findAll(req.query)

    pagination = addLinksToPagination(baseUrl, curentUrl, users, pagination, req.query)

    return res.status(200).json({
      statusCode : 200,
      message    : 'success',
      data       : users,
      pagination : pagination
    })
  } catch (error) {
    next(error)
  }
}

export const getById = async(req, res, next) =>{
  try {
    const id = +req.params.id
    const get = await userService.findById(id)
    return response(res, get)
  } catch (error) {
    next(error)
  }
}

export const update = async(req, res, next) => {
  try {
    if(+req.params.id !== +req.user.sub) throw new ResponseError(403, "Forbidden")

    const result = await userService.update(+req.params.id, req.body)
    return response(res, result)
  } catch (error) {
    next(error)
  }
}

export const updatePassword = async(req, res, next) => {
  try {
    if(+req.params.id !== +req.user.sub) throw new ResponseError(403, "Forbidden")

    await userService.updatePassword(+req.params.id, req.body)
    return response(res, null, "password change successfully")
  } catch (error) {
    next(error)
  }
}
