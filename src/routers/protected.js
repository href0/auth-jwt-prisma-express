import express from "express"
import userRouter from './user.router.js'
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { permissionMiddleware } from "../middlewares/permission.middleware.js"

const router = express.Router()

router.use(authMiddleware)
router.use(permissionMiddleware)
router.use('/user', userRouter)

export default router