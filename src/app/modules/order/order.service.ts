import { User } from './../user/user.model'
import { TOrder } from './order.interface'
import { Order } from './order.model'

const addProductToOrderIntoUserDb = async (
  userId: number,
  orderData: TOrder,
) => {
  const existingUser = await User.isUserExists(userId)
  if (!existingUser) {
    return null
  }

  if (!existingUser.orders) {
    existingUser.orders = []
  }
  existingUser.orders.push(orderData)
  await existingUser.save()
  return existingUser
}

const getAllOrdersByUserIdFromDB = async (id: number) => {
  const existingUser = await User.isUserExists(id)
  if (!existingUser) {
    return null
  }
  return existingUser.orders
}

const getTotalPriceOfOrdersByUserIdFromDb = async (id: number) => {
  const existingUser = await User.isUserExists(id)
  if (!existingUser) {
    return null
  }
  const totalPrice = existingUser.orders.reduce(
    (total, product) => product.price * product.quantity + total,
    0,
  )
  return { totalPrice: totalPrice.toFixed(2) }
}

export const OrderServices = {
  addProductToOrderIntoUserDb,
  getAllOrdersByUserIdFromDB,
  getTotalPriceOfOrdersByUserIdFromDb,
}
