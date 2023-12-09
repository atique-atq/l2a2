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

const putUserIntoDB = async (id: number, updatedUserData: TUser) => {
  if (!User.isUserExists(id)) {
    return null
  }
  const result = await User.updateOne({ id }, { updatedUserData })
  return result
}

const deleteUserFromDB = async (id: number) => {
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
