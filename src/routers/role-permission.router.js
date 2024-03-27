import express from "express"
import { create, getById, getAll, remove, update } from "../controllers/role-permission.controller.js"
import { permissionMiddleware } from "../middlewares/permission.middleware.js"

const router = express.Router()
router.use(permissionMiddleware)
router.get('/', getAll)
router.get('/:id', getById)
router.post('/', create)
router.delete('/:id', remove)
// router.put('/:id', update)

export default router