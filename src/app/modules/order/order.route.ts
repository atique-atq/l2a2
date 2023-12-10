import express from 'express'
import { OrderControllers } from './order.controller'

const router = express.Router()

router.put('/:userId/orders', OrderControllers.addProductToUserOrders)

router.get('/:userId/orders', OrderControllers.getAllOrdersByUserId)

router.get(
  '/:userId/orders/total-price',
  OrderControllers.getTotalPriceOfOrdersByUserId,
)

export const OrderRoutes = router
