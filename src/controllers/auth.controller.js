import { logger } from "../app/logging.js"
import { ResponseError } from "../error/response.error.js"
import { response } from "../helpers/response.helper.js"
import authService from '../services/auth.service.js'

export const signup = async (req, res, next) =>{
  try {
    const signup = await authService.signup(req.body)
    return response(res, signup, 'user created successfully', 201)
  } catch (error) {
    next(error)
  }
}

export const signin = async (req, res, next) =>{
  try {
    const signin = await authService.signin(req.body)
    const maxAge = process.env.COOKIE_EXPIRED * 24 * 60 * 60 * 1000
    res.cookie('refreshToken', signin.refreshToken, { 
      maxAge : maxAge, 
      secure : process.env.NODE_ENV == 'production' ? true : false,  
      httpOnly: true,
      sameSite :  process.env.NODE_ENV == 'production' ? 'none' : 'strict'
    })
    const { refreshToken, ...other } = signin

    return response(res, other)
  } catch (error) {
    next(error)
  }
}

export const refreshToken = async(req, res, next) => {
  try {
    const refreshToken = req.cookies['refreshToken']
    logger.info('refreshToken = ' + refreshToken)
    if(!refreshToken) throw new ResponseError(401, 'Unauthorized')

    const user = await authService.refreshToken(refreshToken)

    return response(res, user)
  } catch (error) {
    next(error)
  }
}

export const signout = async(req, res, next) => {
  try {
    const refreshToken = req.cookies['refreshToken']
    if(!refreshToken) return response(res)

    res.clearCookie('refreshToken')
    return response(res)

  } catch (error) {
    next(error)
  }
}
