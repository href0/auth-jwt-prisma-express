import { response } from "../helpers/response.helper.js"
import rolePermissionService from "../services/role-permission.service.js"

export const create = async(req, res, next) => {
  try {
    const result = await rolePermissionService.create(req.body)
    return response(res, result)
  } catch (error) {
    next(error)
  }
}

export const getAll = async(req, res, next) => {
  try {
    const { pagination, results } = await rolePermissionService.findAll(req)
    return response(res, results, 'success', 200, pagination)
  } catch (error) {
    next(error)
  }
}

export const getById = async(req, res, next) => {
  try {
    const id = +req.params.id
    const get = await rolePermissionService.findById(id)
    return response(res, get)
  } catch (error) {
    next(error)
  }
}

export const update = async(req, res, next) => {}

export const remove = async(req, res, next) => {}