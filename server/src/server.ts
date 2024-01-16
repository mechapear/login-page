import cors from 'cors'
import express, { Express } from 'express'
import { handleLogin } from './auth.ts'

// create app which allow us to set up entire server
const app: Express = express()

// enable CORS Requests
app.use(cors())

const port: number = 3000

// for parsing request.body in json
app.use(express.json())

app.post('/api/auth', handleLogin)

// start server
app.listen(port, () => console.log(`Application is running on port ${port}`))
