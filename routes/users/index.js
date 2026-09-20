import express from "express"
import { prisma } from "../../utils/prisma/prisma.util.js"

const userRouter = express.Router()
userRouter.get("/", async (request, response) => {
    const data = await prisma.user.findMany()

    response.json(data)
})

export { userRouter }