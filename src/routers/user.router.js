import express from "express"
import { create, getAll, getById, update, updatePassword } from "../controllers/user.controller.js"
import { permissionMiddleware } from "../middlewares/permission.middleware.js"

const router = express.Router()
router.use(permissionMiddleware)
router.get('/', getAll)
router.get('/:id', getById)
router.post('/', create)
router.put('/:id', update)
router.patch('/change-password/:id', updatePassword)

export default router