// user.validation.ts

import { z } from 'zod'

const fullNameSchema = z.object({
  firstName: z.string({ required_error: 'First Name is required' }),
  lastName: z.string({ required_error: 'Last Name is required' }),
})

const addressSchema = z.object({
  street: z.string({ required_error: 'Street is required' }),
  city: z.string({ required_error: 'City is required' }),
  country: z.string({ required_error: 'Country is required' }),
})

const orderSchema = z.object({
  productName: z.string({ required_error: 'Product Name is required' }),
  price: z.number({ required_error: 'Price is required' }),
  quantity: z.number({ required_error: 'Quantity is required' }),
})

const baseUserSchema = z.object({
  userId: z.number({ required_error: 'User ID is required' }),
  username: z.string({ required_error: 'Username is required' }),
  password: z.string({ required_error: 'Password is required' }),
  fullName: fullNameSchema,
  age: z.number({ required_error: 'Age is required' }),
  email: z.string({ required_error: 'Email is required' }),
  isActive: z.boolean().optional().default(true),
  hobbies: z.array(z.string({ required_error: 'Hobby is required' })),
  address: addressSchema,
  orders: z.array(orderSchema),
  isDeleted: z.boolean().optional().default(false),
})

export const userSchema = baseUserSchema

export const userUpdateSchema = userSchema.partial()
