interface TFullName {
  firstName: string
  lastName: string
}

interface TAddress {
  street: string
  city: string
  country: string
}

interface TOrder {
  productName: string
  price: number
  quantity: number
}

interface TUser {
  userId: number
  username: string
  password: string
  fullName: TFullName
  age: number
  email: string
  isActive: boolean
  hobbies: string[]
  address: TAddress
  orders: TOrder[]
}

export { TUser, TFullName, TAddress, TOrder }
