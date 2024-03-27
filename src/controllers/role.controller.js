import { response } from "../helpers/response.helper.js"
import roleService from "../services/role.service.js"

export const getAll = async(req, res, next) => {
  try {
    const { pagination, results } = await roleService.findAll(req)
    return response(res, results, 'success', 200, pagination)
  } catch (error) {
    next(error)
  }
}

export const create = async(req, res, next) => {
  try {
    const result = await roleService.create(req.body)
    return response(res, result)
  } catch (error) {
    next(error)
  }
}

export const update = async(req, res, next) => {
  try {
    const id = +req.params.id
    const result = await roleService.update(id, req.body)
    return response(res, result)
  } catch (error) {
    next(error)
  }
}

export const getById = async(req, res, next) =>{
  try {
    const id = +req.params.id
    const get = await roleService.findById(id)
    return response(res, get)
  } catch (error) {
    next(error)
  }
}

export const getPermission = async(req, res, next) => {
  try {
    const id = +req.params.id
    const get = await roleService.getPermission(id)
    return response(res, get)
  } catch (error) {
    next(error)
  }
}

export const remove = async(req, res, next) => {
  try {
    const id = +req.params.id
    await roleService.destroy(id)
    response(res, null, 'Role deleted successfully')
  } catch (error) {
    next(error)
  }
}