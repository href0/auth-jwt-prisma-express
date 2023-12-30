import { logger } from "../app/logging.js"
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
    const curentUrl = req['_parsedUrl']['query']

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
