import { object, string, number, date,  } from 'yup';

const createUserValidation = object({
  email    : string().email(),
  name     : string().required().strict(true),
  password : string().required(),
})

export {
  createUserValidation
}
