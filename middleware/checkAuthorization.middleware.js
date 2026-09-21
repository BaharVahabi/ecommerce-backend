import { customError } from "../utils/errorHandler.js"

const checkAuthorization = (request, response, next, role) => {
    const user = request.user

    if (!user) {
        customError("user token is not valid ! please login")
    }

    if (user.role != role) {
        customError("you don't have access for this action", 403)
    }

    next()
}

const checkAuthorizationAdmin = (request, response, next) =>
    checkAuthorization(request, response, next, "admin")

export { checkAuthorizationAdmin }