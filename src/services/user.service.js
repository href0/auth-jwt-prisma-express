import { prisma } from "../app/database.js"
import { logger } from "../app/logging.js"
import { ResponseError } from "../error/response.error.js"
import { hashBcrypt } from "../helpers/common.js"
import { createUserValidation, findAllUserValidation, findByIdValidation, updatePasswordUserValidation, updateUserValidation } from "../validations/user.validation.js"
import { validate } from "../validations/validation.js"
import bcrypt from 'bcrypt'
const userSelect = { id: true, name : true, email : true, createdAt:true, updatedAt : true }
const DEFAULT_PER_PAGE = 10

const create = async (request) => {
  let data = await validate(createUserValidation, request)
  const now = new Date().getTime() / 1000
  data['createdAt'] = now
  data['updatedAt'] = now
  const save = await prisma.user.create({
    data : data
  })
  return save
}

const findAll  = async (filter) => {
  filter.page    = +filter.page || 1
  filter.perPage = +filter.perPage || DEFAULT_PER_PAGE
  filter.sort    = filter.sort || 'desc'
  filter.sortBy  = filter.sortBy || 'updatedAt'
 
  await validate(findAllUserValidation, filter)

  let params = {
    take    : filter.perPage,
    skip    : (filter.page - 1) * filter.perPage,
    orderBy : { [filter.sortBy] : filter.sort},
    select  : userSelect
  }

  if(filter.search && filter.searchValue) {
    params['where'] = { [filter.search] : { contains : filter.searchValue } }
  }

  const  { take, skip, select, ...noLimit } = params
  const [ total, users ] = await Promise.all([
    prisma.user.count(noLimit),
    prisma.user.findMany(params),
  ])

  const pagination = {
    totalItems  : total,
    totalPages  : Math.ceil(total / filter.perPage),
    currentPage : filter.page,
    perPage     : filter.perPage
  }
  
  return { users, pagination }
}

const findById = async(id) => {
  await validate(findByIdValidation, { id })

  const user = await prisma.user.findUniqueOrThrow({
    select : userSelect,
    where : { id : id }
  })

  return user
} 

const update = async(id, request, currentUser) => {

  await validate(findByIdValidation, { id })
  const data = await validate(updateUserValidation, request)

  if(data.email) {
    const check = await prisma.user.findFirst({
      where : {
        AND : [
          {  email : data.email },
          { id : { not : id } }
        ]
      }
    })
    if(check) throw new ResponseError(409, "email already exists")
  }

  await prisma.user.findUniqueOrThrow({
    select : userSelect,
    where : { id : id }
  })

  const update = await prisma.user.update({
    where : { id : id },
    data : data,
    select : userSelect,
  })

  return update
}

const updatePassword = async(id, request) => {
  const data = await validate(updatePasswordUserValidation, request)

  await prisma.user.findUniqueOrThrow({
    where : { id : id }
  })
  
  const passwordHash = hashBcrypt(data.password)

  await prisma.user.update({
    where : { id : id },
    data : { password : passwordHash }
  })  

  return true
  
}

export default {
  create,
  findAll,
  findById,
  update,
  updatePassword,
  DEFAULT_PER_PAGE,
}
