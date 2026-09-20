import validator from "express-validator"

const checkValidation = (request, response, next) => {
  const errors = validator.validationResult(request)

  if (!errors.isEmpty()) {
    return response.status(422).send(errors)
  }

  next()
}

export { checkValidation }