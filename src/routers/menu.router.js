import express from "express"
import { getAll } from "../controllers/menu.controller.js"

const router = express.Router()
router.get('/', getAll)
// router.get('/:id', getById)
// router.post('/', create)
// router.put('/:id', update)
export default router