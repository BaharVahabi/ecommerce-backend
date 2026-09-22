import express from "express"
import { prisma } from "../../utils/prisma/prisma.util.js"
import { checkAuthentication } from "../../middleware/checkAuthentication.middleware.js"
import { uploader } from "../../utils/files.util.js"
import { customError } from "../../utils/errorHandler.js"

const userRouter = express.Router()
userRouter.get("/", async (request, response) => {
  const data = await prisma.user.findMany()

  response.json(data)
})

userRouter.get("/profiles",
  checkAuthentication,
  async (request, response) => {
    const userId = request.user.id
    const userImages = await prisma.userImage.findMany({
      where: {
        userId: userId
      }
    })
    return response.json({
      success: true,
      data: userImages
    })
  }
)
userRouter.post(
  "/profile",
  checkAuthentication,
  uploader.single("image"),
  async (request, response) => {
    const userId = request.user.id
    const file = request.file

    const userImage = await prisma.userImage.create({
      data: {
        image: file.filename,
        userId: userId
      }
    })

    return response.status(201).json({
      success: true,
      data: userImage,
      message: "user image uploaded successfully"
    })
  }
)
userRouter.delete("/profiles/:id",
  checkAuthentication,
  async (request, response) => {
    const userId = request.user.id
    const imageId = request.params.id

    const userImage = await prisma.userImage.findFirst({
      where: {
        id: imageId,
        userId: userId,
      }
    })
    if (!userImage) {
      customError("user image not found ", 404)
    }
    await prisma.userImage.delete({
      where: {
        id: imageId
      }
    })
    return response.json({
      success: true,
      message: "user image deleted successfully"
    })
  }

)
export { userRouter }