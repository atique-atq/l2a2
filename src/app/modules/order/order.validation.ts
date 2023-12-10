// user.validation.ts

import { z } from 'zod'

export const orderSchema = z.object({
  productName: z.string({ required_error: 'Product Name is required' }),
  price: z.number({ required_error: 'Price is required' }),
  quantity: z.number({ required_error: 'Quantity is required' }),
})
