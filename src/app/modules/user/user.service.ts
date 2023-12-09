import { TUser } from './user.interface'
import { User } from './user.model'

const createUserIntoDB = async (UserData: TUser) => {
  if (await User.isUserExists(UserData.userId)) {
    throw new Error('User already exists!')
  }
  const result = await User.create(UserData)
  return result
}

const getAllUsersFromDB = async () => {
  const result = await User.find()
  return result
}

const getSingleUserFromDB = async (id: number) => {
  const result = await User.aggregate([{ $match: { id } }])
  return result
}

const putUserIntoDB = async (id: number) => {
  if (await !User.isUserExists(id)) {
    throw new Error('User not found')
  }
  const result = await User.updateOne({ id }, { isDeleted: true })
  return result
}

const deleteUserFromDB = async (id: string) => {
  const result = await User.updateOne({ id }, { isDeleted: true })
  return result
}

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  putUserIntoDB,
  deleteUserFromDB,
}
