import bcryptjs from 'bcryptjs'
import { Request, Response } from 'express'
import { getUserByEmail, User } from './users.ts'

export function validateUserLogin(
  user: User | undefined,
  password: string,
): Promise<boolean> | boolean {
  // make sure the user exists
  if (!user) return false
  const storedHashedPassword = user.password
  // compare the provided password with the stored hashed password
  return bcryptjs.compare(password, storedHashedPassword)
}

type LoginResponse = {
  isSuccess: boolean
  message: string
}

type LoginBody = {
  email: string
  password: string
}

export async function handleLogin(
  request: Request<never, LoginResponse, LoginBody>,
  response: Response<LoginResponse>,
) {
  const { email, password } = request.body

  // get the user object from the database
  const user = getUserByEmail(email)

  // compare password with the stored hashed password
  const isPasswordValid = await validateUserLogin(user, password)

  if (isPasswordValid) {
    // HTTP status 200 OK
    response.status(200).json({
      isSuccess: true,
      message: 'Login successful',
    })
  } else {
    // HTTP status 401 Unauthorized
    response.status(401).json({
      isSuccess: false,
      message: 'Invalid login',
    })
  }
}
