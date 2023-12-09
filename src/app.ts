import cors from 'cors'
import express, { Application, Request, Response } from 'express'
//import { UserRoutes } from './app/modules/user/user.route'

const app: Application = express()

//parsers
app.use(express.json())
app.use(cors())

// application routes
//app.use('/api/users', UserRoutes)

const getAController = (req: Request, res: Response) => {
  const a = 120
  res.json({ num: a })
}

app.get('/', getAController)

export default app
