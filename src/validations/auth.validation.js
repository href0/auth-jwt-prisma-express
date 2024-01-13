import { object, string, number, date,  } from 'yup';

const signupValidation = object({
  email    : string().email(),
  name     : string().required().strict(true),
  password : string().required(),
  roleId   : number().notRequired(),
})

const signinValidation = object({
  email    : string().required().email(),
  password : string().required(),
})

export {
  signupValidation,
  signinValidation
}
