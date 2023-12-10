import { TUser } from './user.interface'
import { User } from './user.model'

const createUserIntoDB = async (UserData: any) => {
  if (await User.isUserExists(UserData.userId)) {
    throw new Error('User already exists!')
  }
  const result = await User.create(UserData as TUser)
  return result
}

const getAllUsersFromDB = async () => {
  const result = await User.find(
    {},
    { username: 1, fullName: 1, age: 1, email: 1, address: 1 },
  )
  return result.map((user) => ({
    username: user.username,
    fullName: {
      firstName: user.fullName.firstName,
      lastName: user.fullName.lastName,
    },
    age: user.age,
    email: user.email,
    address: {
      street: user.address.street,
      city: user.address.city,
      country: user.address.country,
    },
  }))
}

const getSingleUserFromDB = async (id: number) => {
  const existingUser = await User.isUserExists(id)
  if (!existingUser) {
    return null
  }
  const responseData = {
    userId: existingUser.userId,
    username: existingUser.username,
    fullName: {
      firstName: existingUser.fullName.firstName,
      lastName: existingUser.fullName.lastName,
    },
    age: existingUser.age,
    email: existingUser.email,
    isActive: existingUser.isActive,
    hobbies: existingUser.hobbies,
    address: {
      street: existingUser.address.street,
      city: existingUser.address.city,
      country: existingUser.address.country,
    },
  }

  return responseData
}

const putUserIntoDB = async (id: number, updatedUserData: any) => {
  const existingUser = await User.isUserExists(id)
  if (!existingUser) {
    return null
  }

  const updatedUser = await User.findOneAndUpdate(
    { userId: id },
    updatedUserData as TUser,
    { new: true },
  )
  if (!updatedUser) {
    return null
  }

  const responseData = {
    userId: updatedUser.userId,
    username: updatedUser.username,
    fullName: {
      firstName: updatedUser.fullName.firstName,
      lastName: updatedUser.fullName.lastName,
    },
    age: updatedUser.age,
    email: updatedUser.email,
    isActive: updatedUser.isActive,
    hobbies: updatedUser.hobbies,
    address: {
      street: updatedUser.address.street,
      city: updatedUser.address.city,
      country: updatedUser.address.country,
    },
  }

  return responseData
}

const deleteUserFromDB = async (id: number) => {
  const existingUser = await User.isUserExists(id)
  if (!existingUser) {
    return null
  }
  const result = await User.updateOne({ userId: id }, { isDeleted: true })
  return result
}

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  putUserIntoDB,
  deleteUserFromDB,
}
