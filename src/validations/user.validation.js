import { object, string, number, date,  } from 'yup';

const findAllUserValidation = object({
  page    : number().notRequired(),
  perPage : number().notRequired().max(300),
  sort    : string().oneOf(['asc', 'desc']).notRequired(),
  sortBy  : string().oneOf(['id', 'name', 'email', 'createdAt', 'updatedAt', 'roleId']).notRequired(),
})

const createUserValidation = object({
  email    : string().email(),
  name     : string().required().strict(true),
  password : string().required(),
})

const updateUserValidation = object({
  email    : string().email(),
  name     : string().required().strict(true),
})

const updatePasswordUserValidation = object({
  password : string().required(),
})

const findByIdValidation = object({
  id : number().strict(true).required()
})

export {
  createUserValidation,
  findByIdValidation,
  updateUserValidation,
  updatePasswordUserValidation,
  findAllUserValidation,
}
