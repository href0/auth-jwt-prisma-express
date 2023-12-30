import express from "express"
import userRouter from './user.router.js'
import { authMiddleware } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.use(authMiddleware)
router.use('/user', userRouter)

export default router