import { prisma } from "../app/database.js"
import { logger } from "../app/logging.js"
import { ResponseError } from "../error/response.error.js"
import { dateToString, hashBcrypt } from "../helpers/common.js"
import { createUserValidation, findAllUserValidation, findByIdValidation, updatePasswordUserValidation, updateUserValidation } from "../validations/user.validation.js"
import { validate } from "../validations/validation.js"
import bcrypt from 'bcrypt'
const userSelect = { id: true, name : true, email : true, createdAt:true, updatedAt : true, gender : true, phone : true, avatar : true, birthDate : true }
const DEFAULT_PER_PAGE = 10

const create = async (request) => {
  await validate(createUserValidation, request)
  console.log('req', request)
  const isExists = await prisma.user.findUnique({
    where : { email : request.email }
  })
  if(isExists) throw new ResponseError(409, "Email already exists")

  const now = new Date().getTime() / 1000
  const passwordHash = hashBcrypt(request.email)

  const data = {
    email     : request.email,
    name      : request.name,
    password  : passwordHash,
    gender    : request.gender,
    birthDate : request.birthDate ? new Date(request['birthDate']).toISOString() : null,
    phone     : request.phone,
    avatar    : request.avatar,
    roleId    : request.roleId || 2,
    createdAt : now,
    updatedAt : now,
  }

  const save = await prisma.user.create({
    data : data,
    select : userSelect
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


  let totalPages =  Math.ceil(total / filter.perPage)
  if(totalPages > 10) {
    totalPages = 10
  }

  const from = Math.floor((filter.page - 1) / totalPages) * totalPages + 1;
  const to = from + (totalPages - 1);
  const pages = []
  for (let x = from; x <= to; x++) {
    pages.push(x)
  }

  const pagination = {
    totalItems  : total,
    totalPages  : Math.ceil(total / filter.perPage),
    currentPage : filter.page,
    perPage     : filter.perPage,
    pages       : pages
  }
  
  return { users, pagination }
}

const findById = async(id) => {
  await validate(findByIdValidation, { id })

  let user = await prisma.user.findUniqueOrThrow({
    select : userSelect,
    where : { id : id }
  })

  user.birthDate = user.birthDate ? dateToString(user.birthDate, true) : null
  return user
} 

const update = async(id, request, currentUser) => {

  await validate(findByIdValidation, { id })
  await validate(updateUserValidation, request)

  if(request.email) {
    const check = await prisma.user.findFirst({
      where : {
        AND : [
          {  email : request.email },
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
  const now = new Date().getTime() / 1000
  request['birthDate'] = new Date(request['birthDate']).toISOString()
  request['updatedAt'] = now
  const data = {
    email     : request.email,
    name      : request.name,
    gender    : request.gender,
    birthDate : request.birthDate,
    phone     : request.phone,
    avatar    : request.avatar,
    updatedAt : request.updatedAt,
  }
  const update = await prisma.user.update({
    where : { id : id },
    data : data,
    select : userSelect,
  })

  update.birthDate = dateToString(update.birthDate, true)
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
