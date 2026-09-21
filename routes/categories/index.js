import express from "express"

import { checkAuthentication } from "../../middleware/checkAuthentication.middleware.js"
import { checkAuthorizationAdmin } from "../../middleware/checkAuthorization.middleware.js"
import { prisma } from "../../utils/prisma/prisma.util.js"
import { customError } from "../../utils/errorHandler.js"

const categoryRouter = express.Router()

categoryRouter.get("/",
    async (request, response) => {
        const categories = await prisma.category.findMany()
        return response.json({
            success: true,
            data: categories,
        })
    }
)



categoryRouter.get("/:id",
    async (request, response) => {
        const id = request.params.id
        const category = await prisma.category.findUnique({
            where: {
                id: id
            }
        })
        if (!category) {
            customError("category not found ", 404)
        }
        return response.json({
            success: true,
            data: category,
            message: "category fetched successfully"
        })
    }
)

categoryRouter.patch(
    "/:id",
    checkAuthentication,
    checkAuthorizationAdmin,
    async (request, response) => {
        const id = request.params.id
        const body = request.body

        const category = await prisma.category.findUnique({
            where: {
                id: id
            }
        })

        if (!category) {
            customError("category not found", 404)
        }

        const updatedCategory = await prisma.category.update({
            where: {
                id: id
            },
            data: {
                name: body.name
            }
        })

        return response.json({
            success: true,
            data: updatedCategory,
            message: "category updated successfully"
        })
    }
)

categoryRouter.post(
    "/",
    checkAuthentication,
    checkAuthorizationAdmin,
    async (request, response) => {
        const body = request.body

        const category = await prisma.category.create({
            data: {
                name: body.name
            }
        })

        return response.status(201).json({
            success: true,
            data: category,
            message: "category created successfully"
        })
    }
)

categoryRouter.delete(
    "/:id",
    checkAuthentication,
    checkAuthorizationAdmin,
    async (request, response) => {
        const id = request.params.id

        const category = await prisma.category.findUnique({
            where: {
                id: id
            }
        })

        if (!category) {
            customError("category not found", 404)
        }

        await prisma.category.delete({
            where: {
                id: id
            }
        })

        return response.json({
            success: true,
            message: "category deleted successfully"
        })
    }
)

export { categoryRouter }