import { Request, Response } from 'express'
import { getUserById, User } from './users.js'

// save the session token in 2 different data structures for fast lookup
// 1) { [sessionToken: string]: userId }
const userIdBySessionToken = new Map<string, number>()
// 2) { [userId: number]: sessionToken }
const sessionTokenByUserId = new Map<number, string>()

// check if it already had the given token -> valid
function validateSessionToken(token: string): boolean {
  return userIdBySessionToken.has(token)
}

// save the new token in memory
export function setSessionToken(token: string, userId: number): void {
  // remove old token of the user
  if (sessionTokenByUserId.has(userId)) {
    const oldToken = sessionTokenByUserId.get(userId) as string
    sessionTokenByUserId.delete(userId)
    userIdBySessionToken.delete(oldToken)
  }

  // save the new token
  sessionTokenByUserId.set(userId, token)
  userIdBySessionToken.set(token, userId)
}

function generateSessionToken(): string {
  return Math.random().toString(36).slice(2)
}

export function createSessionToken(userId: number): string {
  const token = generateSessionToken()
  // save the new token in memory
  setSessionToken(token, userId)
  return token
}

type SessionBody = {
  token: string | undefined
}

type SessionResponse = {
  code: 'UNAUTHORIZED' | 'INVALID_TOKEN' | 'VALID_TOKEN'
  user?: {
    firstName: string
    lastName: string
  }
}

export async function handleGetSessionInfo(
  request: Request<never, SessionResponse, SessionBody>,
  response: Response<SessionResponse>,
) {
  // check request header to get the token
  const token = request.headers['authorization'] as string | undefined

  console.log({ headers: request.headers })
  console.log('token: ', token)

  // then check if the session is still valid
  // if there is no token, return 401 Unauthorized
  if (!token) {
    return response.status(401).json({ code: 'UNAUTHORIZED' })
  }

  // if there is a token, check if it's valid
  if (!validateSessionToken(token)) {
    return response.status(401).json({ code: 'INVALID_TOKEN' })
  }

  // get the userId from the token
  const userId = userIdBySessionToken.get(token) as number
  const user = getUserById(userId) as User

  // response with the user info
  response.status(200).json({
    code: 'VALID_TOKEN',
    user: {
      firstName: user.firstName,
      lastName: user.lastName,
    },
  })
}
