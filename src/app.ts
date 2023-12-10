import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import { UserRoutes } from './app/modules/user/user.route'
import { OrderRoutes } from './app/modules/order/order.route'

const app: Application = express()

//parsers
app.use(express.json())
app.use(cors())

// application routes
app.use('/api/users', UserRoutes)
app.use('/api/users', OrderRoutes)

const getAController = (req: Request, res: Response) => {
  const a = 120
  res.json({ num: a })
}

app.get('/', getAController)

export default app
