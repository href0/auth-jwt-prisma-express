import express from "express"
import dotenv from "dotenv"
import publicRouter from "./src/routers/public.js"
import protectedRouter from "./src/routers/protected.js"
import { errorMiddleware } from "./src/middlewares/error.middleware.js"
import { logger } from "./src/app/logging.js"
import { notFound } from "./src/middlewares/not-found.middleware.js"
import cookieParser  from "cookie-parser"
import cors from 'cors' 

const app = express()
app.use(cors({
  origin : 'http://localhost:4200',
  credentials : true
}))
dotenv.config()
const PORT = process.env.PORT || 3000

app.get("/", async (req, res) => {
  return res.status(200).json({
    message: "Welcome to href Corp",
  })
})

app.use(express.json())
app.use(cookieParser())

app.use(publicRouter)
app.use(protectedRouter)

app.use(notFound)
app.use(errorMiddleware)

app.listen(PORT, () => {
  logger.info(`Server running at port ${PORT}`)
})
