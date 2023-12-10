import express from 'express'
import { OrderControllers } from './order.controller'

const router = express.Router()

router.put('/:userId/orders', OrderControllers.addProductToUserOrders)

router.get('/:userId', OrderControllers.getSingleUser)

router.get('/', OrderControllers.getAllUsers)

export const OrderRoutes = router
