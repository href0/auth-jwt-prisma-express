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
    const { pagination, results } = await userService.findAll(req)
    return response(res, results, 'success', 200, pagination)
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
    if (
      req.user.roleId !== -1 &&
      +req.params.id !== req.user.sub &&
      req.user.permission.canUpdateOthers === 0
    ) throw new ResponseError(403, "Forbidden")

    const result = await userService.update(+req.params.id, req.body, req.user)

    return response(res, result)
  } catch (error) {
    next(error)
  }
}

export const updatePassword = async(req, res, next) => {
  try {
    if (
      req.user.roleId !== -1 &&
      +req.params.id !== req.user.sub &&
      req.user.permission.canUpdateOthers === 0
    ) throw new ResponseError(403, "Forbidden")

    await userService.updatePassword(+req.params.id, req.body)
    return response(res, null, "password change successfully")
  } catch (error) {
    next(error)
  }
}
