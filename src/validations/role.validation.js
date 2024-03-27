import { object, string, number, date,  } from 'yup';

const createRoleValidation = object({
  name : string().required()
})

const updateRoleValidation = object({
  name : string().required()
})

const findByIdRoleValidation = object({
  id : number().strict(true).required()
})

const findAllRoleValidation = object({
  page    : number().notRequired(),
  perPage : number().notRequired().max(300),
  sort    : string().oneOf(['asc', 'desc']).notRequired(),
  sortBy  : string().oneOf(['id', 'name']).notRequired(),
})

const removeRoleValidation = object({
  id : number().strict(true).required()
})

export {
  findByIdRoleValidation,
  createRoleValidation,
  updateRoleValidation,
  removeRoleValidation,
  findAllRoleValidation,
}