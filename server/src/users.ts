import bcryptjs from 'bcryptjs'

export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
}

const users: User[] = [
  {
    id: 1,
    firstName: 'JOHN',
    lastName: 'DOE',
    email: 'john@gmail.com',
    password: await hashPassword('john123456'),
  },
  {
    id: 2,
    firstName: 'JANE',
    lastName: 'DOE',
    email: 'jane@gmail.com',
    password: await hashPassword('jane123456'),
  },
  {
    id: 3,
    firstName: 'JAMES',
    lastName: 'SMITH',
    email: 'james@gmail.com',
    password: await hashPassword('james123456'),
  },
  {
    id: 4,
    firstName: 'MARY',
    lastName: 'SMITH',
    email: 'mery@gmail.com',
    password: await hashPassword('mary123456'),
  },
]

// get the user object from the database based on the provided email
export function getUserByEmail(email: string): User | undefined {
  return users.find((user) => user.email === email)
}

export function hashPassword(password: string): Promise<string> {
  // generally recommend a higher numSaltRounds in production (at least 8)
  const numSaltRounds = 4
  // create a secure hash of password
  // don't recommend using hashSync()
  // hashSync() will block entire Node process while it runs
  return bcryptjs.hash(password, numSaltRounds)
}
