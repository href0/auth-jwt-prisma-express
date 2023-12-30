import { prisma } from "../app/database.js"
import { logger } from "../app/logging.js"
import { createUserValidation } from "../validations/user.validation.js"
import { validate } from "../validations/validation.js"

const create = async (data) => {
  await validate(createUserValidation, data)
  const now = new Date().getTime() / 1000
  data['createdAt'] = now
  data['updatedAt'] = now
  const save = await prisma.user.create({
    data : data
  })
  return save
}

const findAll  = async (filter) => {
  let { page, perPage, search, searchValue, sort, sortBy } = filter
  page    = page || 1
  perPage = perPage || 10
  sort    = sort || 'asc'
  sortBy  = sortBy || 'updatedAt'

  let params = {
    take    : +perPage,
    skip    : (+page - 1) * perPage,
    orderBy : { [sortBy] : sort},
    select  : { id: true, name : true, email : true, createdAt:true, updatedAt : true }
  }

  if(search && searchValue) {
    params['where'] = { [search] : { contains : searchValue } }
  }

  const  { take, skip, select, ...noLimit } = params
  const [ total, users ] = await Promise.all([
    prisma.user.count(noLimit),
    prisma.user.findMany(params),
  ])

  const pagination = {
    totalItems  : total,
    totalPages  : Math.ceil(total / +perPage),
    currentPage : +page,
    perPage     : +perPage
  }
  
  return { users, pagination }
}

export default {
  create,
  findAll
}
