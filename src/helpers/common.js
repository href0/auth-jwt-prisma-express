import userService from "../services/user.service.js";
import bcrypt from "bcrypt"
import { validate } from "../validations/validation.js";
import { ResponseError } from "../error/response.error.js";

export const dateToString = (date = null, onlyDate = false) => {
  date = date ? new Date(date) : new Date();

  const tahun = date.getFullYear();
  const bulan = String(date.getMonth() + 1).padStart(2, '0');
  const hari = String(date.getDate()).padStart(2, '0');

  const jam = String(date.getHours()).padStart(2, '0');
  const menit = String(date.getMinutes()).padStart(2, '0');
  const detik = String(date.getSeconds()).padStart(2, '0');

  let formattedDate = `${tahun}-${bulan}-${hari}`
  if(!onlyDate) {
    formattedDate += ` ${jam}:${menit}:${detik}`
  }
  return formattedDate;
}

export const addLinksToPagination = (baseUrl, curentUrl, data, pagination, filter) => {
  filter.page    = filter.page || 1
  filter.perPage = filter.perPage || userService.DEFAULT_PER_PAGE
  let nextPage = Number(filter.page) + 1
  if( filter.page >= pagination.totalPages ) {
    nextPage = null
  }

  const firstUrl = (data.length > 0 || pagination.totalPages > 0) ? baseUrl + curentUrl.replace(`page=${filter.page}`, `page=${1}`) : null
  const lastUrl = (data.length > 0 || pagination.totalPages > 0) ? baseUrl + curentUrl.replace(`page=${filter.page}`, `page=${pagination.totalPages}`) : null
  const nextUrl = nextPage ? baseUrl + curentUrl.replace(`page=${filter.page}`, `page=${nextPage}`) : null
  const prevUrl = filter.page > 1 ? baseUrl + curentUrl.replace(`page=${filter.page}`, `page=${Number(filter.page) - 1}`) : null
  const links = {
    next  : nextUrl,
    prev  : prevUrl,
    first : firstUrl,
    last  : lastUrl
  }
  pagination.links = links

  return pagination
}

export const hashBcrypt = (value) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const result = bcrypt.hashSync(value, salt)

  return result
}

export const getResultsAndPagination = async (validationSchema, attributes, prismaModel, req) => {
  const filter = req.query
  const DEFAULT_PER_PAGE = 10
  filter.page    = +filter.page || 1
  filter.perPage = +filter.perPage || DEFAULT_PER_PAGE
  filter.sort    = filter.sort || 'desc'
  filter.sortBy  = filter.sortBy || 'updatedAt'
  const baseUrl = req['protocol'] + '://' + req.headers['host'] + req['baseUrl'] + '?'
  let curentUrl = req['_parsedUrl']['query']
  if(!curentUrl) {
    curentUrl = `page=${req.query.page}&perPage=${req.query.perPage}`
  }

  await validate(validationSchema, filter)

  let params = {
    take    : filter.perPage,
    skip    : (filter.page - 1) * filter.perPage,
    orderBy : { [filter.sortBy] : filter.sort},
    select  : attributes,
  
  }

  if(filter.search && filter.searchValue) {
    params['where'] = { [filter.search] : { contains : filter.searchValue } }
  }

  const  { take, skip, select, ...noLimit } = params
  const [ total, results ] = await Promise.all([
    prismaModel.count(noLimit),
    prismaModel.findMany(params),
  ])

  let totalPages =  Math.ceil(total / filter.perPage)
  if(totalPages > 10) {
    totalPages = 10
  }

  const from = Math.floor((filter.page - 1) / totalPages) * totalPages + 1;
  const to = Math.floor(from / totalPages) + totalPages;
  const pages = []
  for (let x = from; x <= to; x++) {
    pages.push(x)
  }

  /* Add pagination */
  const pagination = {
    totalItems  : total,
    totalPages  : Math.ceil(total / filter.perPage),
    currentPage : filter.page,
    perPage     : filter.perPage,
    pages       : pages,
    links       : null
  }

  let nextPage = Number(filter.page) + 1
  if( filter.page >= pagination.totalPages ) {
    nextPage = null
  }

  const firstUrl = (results.length > 0 || pagination.totalPages > 0) ? baseUrl + curentUrl.replace(`page=${filter.page}`, `page=${1}`) : null
  const lastUrl = (results.length > 0 || pagination.totalPages > 0) ? baseUrl + curentUrl.replace(`page=${filter.page}`, `page=${pagination.totalPages}`) : null
  const nextUrl = nextPage ? baseUrl + curentUrl.replace(`page=${filter.page}`, `page=${nextPage}`) : null
  const prevUrl = filter.page > 1 ? baseUrl + curentUrl.replace(`page=${filter.page}`, `page=${Number(filter.page) - 1}`) : null
  const links = {
    next  : nextUrl,
    prev  : prevUrl,
    first : firstUrl,
    last  : lastUrl
  }
  pagination.links = links

  return { results, pagination } 
}

export const errorPrisma = (err) => {
  const errorsCode = {
    'P2002' : {
      statusCode : 409,
      message : "Oops!! It looks like the data you entered already exists"
    },
    'P2025' : {
      statusCode : 404,
      message : err.message || "Data Not Found"
    },
    'P2003' : {
      statusCode : 400,
      message : `${err?.meta?.field_name} you've sent does not exists!`
    },
  }
  return errorsCode[err.code] || { statusCode : 500,  message : "Oops!! Something went wrong"  }
}

export const findDuplicateByKeys = (array, ...keys) => {
  const seen = new Set();
  const duplicates = new Set();

  for (const item of array) {
    const keyValues = keys.map(key => item[key]);
    const key = keyValues.join('-');
    if (seen.has(key)) {
      duplicates.add(key);
    } else {
      seen.add(key);
    }
  }
  return Array.from(duplicates)
}

export const checkDuplicateByKeys = (array, ...keys) =>  {
  const duplicates = findDuplicateByKeys(array, ...keys);
  if (duplicates.length > 0) 
    throw new ResponseError(409, `Duplicate entry found for keys: ${keys.join('-')}`, duplicates);
  return
}