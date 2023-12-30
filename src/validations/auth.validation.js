import { object, string, number, date,  } from 'yup';

const signupValidation = object({
  email    : string().email(),
  name     : string().required().strict(true),
  password : string().required(),
})

const signinValidation = object({
  email    : string().email(),
  password : string().required(),
})

export {
  signupValidation,
  signinValidation
}
