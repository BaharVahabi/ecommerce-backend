import express from "express"
import validator from "express-validator"
import { checkValidation } from "../../middleware/checkValidation.middleware.js"
import { prisma } from "../../utils/prisma/prisma.util.js"
import { customError } from "../../utils/errorHandler.js"
import { hashPassword, comparePassword  } from "../../utils/hashPassword.js"
import { createJwtToken } from "../../utils/jwtHelper.js"
const authRouter = express.Router()

const loginValidation = [
    validator.body("email").isString().isEmail().withMessage("email is not valid "),
    validator.body("password").isString().isLength({ min: 3, max: 30 }).withMessage("password must be between 3 and 30 characters"),
]
const registerValidation = [
    validator.body("email").isString().isEmail().withMessage("email is not valid "),
    validator.body("password").isString().isLength({ min: 3, max: 30 }).withMessage("password must be between 3 and 30 characters"),
    validator.body("name").isString().isLength({ min: 3, max: 30 }).withMessage("your name is not valid")
]

authRouter.post(
    "/register",
    registerValidation,
    checkValidation,
    async (request, response) => {
        const body = request.body

        const checkUser = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        })

        if (checkUser) {
            customError("user already exist", 400)
        }

        const hashedPassword = await hashPassword(body.password)

        const newUser = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: hashedPassword,
                role: "user"
            }
        })

        const token = createJwtToken({
            id: newUser.id,
            role: newUser.role
        })

        return response.send({ token })
    }
)

authRouter.post(
    "/login",
    loginValidation,
    checkValidation,
    async (request, response) => {
        const body = request.body

        const checkUser = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        })

        if (!checkUser) {
            customError("user could not found", 404)
        }

        const checkPassword = await comparePassword(
            body.password,
            checkUser.password
        )

        if (!checkPassword) {
            customError("password is wrong", 400)
        }

        const token = createJwtToken({
            id: checkUser.id,
            role: checkUser.role
        })

        return response.send({ token })
    }
)

export { authRouter }