import cors from 'cors'
import express, { Express } from 'express'
import { handleLogin } from './auth.ts'
import { handleGetSessionInfo } from './session.ts'

// create app which allow us to set up entire server
const app: Express = express()

const port: number = 3000

// enable CORS Requests
app.use(
  cors({
    origin: 'http://localhost:5173',
  }),
)

// for parsing request.body in json
app.use(express.json())

app.post('/api/auth', handleLogin)
app.get('/api/session-info', handleGetSessionInfo)

// start server
app.listen(port, () => console.log(`Application is running on port ${port}`))
