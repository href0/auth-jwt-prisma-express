import { prisma } from "../app/database.js"
import { ResponseError } from "../error/response.error.js"
import { hashBcrypt } from "../helpers/common.js"
import { signinValidation, signupValidation } from "../validations/auth.validation.js"
import { validate } from "../validations/validation.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

const signup = async(request) => {
  await validate(signupValidation, request)
  const passwordHash = hashBcrypt(request.password)
  request.password  = passwordHash
  request.createdAt = new Date().getTime() / 1000
  request.roleId    = 2

  const signup = await prisma.user.create({
    data : request,
    select : { id: true, name : true, email : true, createdAt : true, updatedAt : true }
  })

  return signup
}

const signin = async(request) => {
  await validate(signinValidation, request)

  const user = await prisma.user.findUnique({where : {email : request.email}})
  if(!user) throw new ResponseError(400, 'Email or password wrong!')

  const hash = bcrypt.compareSync(request.password, user.password);
  if(!hash) throw new ResponseError(400, 'Email or password wrong!')

  const payload = {
    sub   : user.id,
    email : user.email,
    name  : user.name,
    roleId  : user.roleId
  }

  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn : process.env.ACCESS_TOKEN_EXPIRED
  })

  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn : process.env.REFRESH_TOKEN_EXPIRED
  })

  user['accessToken'] = accessToken
  user['refreshToken'] = refreshToken
  const { password, ...other } = user
  return other
}

const refreshToken = async(token) => {
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)

    const user = await prisma.user.findUnique({
      where : { id : decoded.sub },
      select : { id: true, name: true, email: true, createdAt : true, roleId : true }
    })

    if(!user) throw new ResponseError(404, "User not found")

    const payload = {
      sub   : user.id,
      email : user.email,
      name  : user.name,
      roleId  : user.roleId
    }

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn : process.env.ACCESS_TOKEN_EXPIRED
    })

    user['accessToken'] = accessToken
    return user

  } catch (error) {
     throw new ResponseError(error.status || 401, error.message || 'Unauthorized')
  }
}

export default {
  signup,
  signin,
  refreshToken
}