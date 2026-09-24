import express, { response } from "express"
import { checkAuthentication } from "../../middleware/checkAuthentication.middleware.js"
import { prisma } from "../../utils/prisma/prisma.util.js"
import { customError } from "../../utils/errorHandler.js"

const favoriteRouter = express.Router()

favoriteRouter.get(
  "/",
  checkAuthentication,
  async (request, response) => {
    const userId = request.user.id

    const favorites = await prisma.favorite.findMany({
      where: {
        userId: userId
      },
      include: {
        product: true
      }
    })

    return response.json({
      success: true,
      data: favorites
    })
  }
)
favoriteRouter.post(
    "/:id",
    checkAuthentication,
    async (request, response) => {
        const userId = request.user.id
        const productId = request.params.id


        const product = await prisma.product.findUnique({
            where: {
                id: productId
            }
        })

        if (!product) {
            customError("product not found", 404)
        }

        const favorite = await prisma.favorite.create({
            data: {
                userId: userId,
                productId: productId
            }
        })

        return response.json({
            success: true,
            data: favorite,
            message: "product added to favorites successfully"
        })
    }
)
favoriteRouter.delete(
  "/:id",
  checkAuthentication,
  async (request, response) => {
    const userId = request.user.id
    const favoriteId = request.params.id

    const favorite = await prisma.favorite.findFirst({
      where: {
        id: favoriteId,
        userId: userId
      }
    })

    if (!favorite) {
      customError("favorite not found", 404)
    }

    await prisma.favorite.delete({
      where: {
        id: favoriteId
      }
    })

    return response.json({
      success: true,
      message: "favorite removed successfully"
    })
  }
)
export { favoriteRouter }