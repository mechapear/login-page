import bcryptjs from 'bcryptjs'
import { Request, Response } from 'express'
import { createSessionToken } from './session.js'
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

type LoginResponse =
  | {
      isSuccess: true
      code: 'SUCCESS'
      sessionToken: string
    }
  | {
      isSuccess: false
      code: 'INVALID_CREDENTIALS'
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

  if (user && isPasswordValid) {
    const sessionToken = createSessionToken(user.id)

    // HTTP status 200 OK
    response.status(200).json({
      isSuccess: true,
      code: 'SUCCESS',
      // return session token to the client
      // so that it can be set in cookie
      sessionToken,
    })
  } else {
    // HTTP status 401 Unauthorized
    response.status(401).json({
      isSuccess: false,
      code: 'INVALID_CREDENTIALS',
    })
  }
}
