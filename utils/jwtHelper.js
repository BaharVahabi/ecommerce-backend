import jwt from "jsonwebtoken"

const createJwtToken = (data) => {
    const secret = process.env.JWT_SECRET
    const token = jwt.sign(data, secret, {
        expiresIn: 60 * 60
    })
    return token
}

const checkJwtToken = (token) => {
    const secret = process.env.JWT_SECRET
    try {
        const checkToken = jwt.verify(token, secret)
        return checkToken

    } catch (error) {
        return undefined

    }
}

export { createJwtToken, checkJwtToken }