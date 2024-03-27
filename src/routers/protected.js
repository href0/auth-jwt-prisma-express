import express from "express"
import userRouter from './user.router.js'
import menuRouter from './menu.router.js'
import roleRouter from './role.router.js'
import rolePermissionRouter from './role-permission.router.js'
import { authMiddleware } from "../middlewares/auth.middleware.js"


const router = express.Router()

router.use(authMiddleware)

router.use('/menu', menuRouter)
router.use('/user', userRouter)
router.use('/role', roleRouter)
router.use('/role-permission', rolePermissionRouter)

export default router