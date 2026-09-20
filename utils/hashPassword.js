import bcrypt from "bcrypt"

const hashPassword = (password) => {
  const hashedPassword = bcrypt.hashSync(password, 10)

  return hashedPassword
}

const comparePassword = async (password, hashedPassword) => {
  const checkPassword = await bcrypt.compare(password, hashedPassword)

  return checkPassword
}

export { hashPassword, comparePassword } 