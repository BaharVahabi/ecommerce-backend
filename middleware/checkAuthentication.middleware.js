import { customError } from "../utils/errorHandler.js"
import { checkJwtToken } from "../utils/jwtHelper.js"

const checkAuthentication = (request, response, next) => {
    let token = request.headers.authorization

    token = token?.split(" ")[1]

    if (!token) {
        customError("please login first", 401)
    }

    const verifiedToken = checkJwtToken(token)

    if (!verifiedToken) {
        customError("token is not valid", 401)
    }

    request.user = verifiedToken

    console.log(verifiedToken)

    next()
}

export { checkAuthentication }