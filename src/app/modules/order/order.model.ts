import { Schema, model } from 'mongoose'
import { TOrder } from './order.interface'

const orderSchema = new Schema<TOrder>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
})

export const User = model<TOrder>('User', orderSchema)
