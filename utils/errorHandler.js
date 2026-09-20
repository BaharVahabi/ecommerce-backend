const customError = (message = "internal error", statusCode = 500) => {
    const newError = new Error(message)
    newError.statusCode = statusCode
    throw newError
}

const errorMiddleware = (error, request, response, next) => {
    const statusCode = error.statusCode || 500
    response.status(statusCode).json({
        status: statusCode,
        message: error.message
    })
}

export { customError, errorMiddleware }