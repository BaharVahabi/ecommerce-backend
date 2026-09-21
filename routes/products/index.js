import express from "express"

import { checkAuthentication } from "../../middleware/checkAuthentication.middleware.js"
import { checkAuthorizationAdmin } from "../../middleware/checkAuthorization.middleware.js"
import { prisma } from "../../utils/prisma/prisma.util.js"
import { customError } from "../../utils/errorHandler.js"
import { uploader } from "../../utils/files.util.js"

const productRouter = express.Router()


productRouter.get(
    "/",
    async (request, response) => {
        const products = await prisma.product.findMany()

        return response.json({
            success: true,
            data: products
        })
    }
)


productRouter.get(
    "/:id",
    async (request, response) => {
        const id = request.params.id

        const product = await prisma.product.findUnique({
            where: {
                id: id
            }
        })

        if (!product) {
            customError("product not found", 404)
        }

        return response.json({
            success: true,
            data: product
        })
    }
)


productRouter.post(
    "/",
    checkAuthentication,
    checkAuthorizationAdmin,
    uploader.single("image"),
    async (request, response) => {

        const body = request.body
        const file = request.file

        const product = await prisma.product.create({
            data: {
                title: body.title,
                description: body.description,
                price: Number(body.price),
                stock: Number(body.stock),
                categoryId: body.categoryId,
                image: file?.filename
            }
        })

        return response.status(201).json({
            success: true,
            data: product,
            message: "product created successfully"
        })
    }
)


productRouter.patch(
    "/:id",
    checkAuthentication,
    checkAuthorizationAdmin,
    async (request, response) => {

        const id = request.params.id
        const body = request.body

        const product = await prisma.product.findUnique({
            where: {
                id: id
            }
        })

        if (!product) {
            customError("product not found", 404)
        }

        const updatedProduct = await prisma.product.update({
            where: {
                id: id
            },
            data: {
                title: body.title,
                description: body.description,
                price: Number(body.price),
                stock: Number(body.stock),
                categoryId: body.categoryId
            }
        })

        return response.json({
            success: true,
            data: updatedProduct,
            message: "product updated successfully"
        })
    }
)


productRouter.delete(
    "/:id",
    checkAuthentication,
    checkAuthorizationAdmin,
    async (request, response) => {

        const id = request.params.id

        const product = await prisma.product.findUnique({
            where: {
                id: id
            }
        })

        if (!product) {
            customError("product not found", 404)
        }

        await prisma.product.delete({
            where: {
                id: id
            }
        })

        return response.json({
            success: true,
            message: "product deleted successfully"
        })
    }
)


export { productRouter }