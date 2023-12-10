import { Request, Response } from 'express'
import { UserServices } from './user.service'
import {
  userSchema as userValidationSchema,
  userUpdateSchema as userUpdateValidationSchema,
} from './user.validation'

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body
    const zodParsedData = userValidationSchema.parse(userData)
    const result = await UserServices.createUserIntoDB(zodParsedData)

    res.status(200).json({
      success: true,
      message: 'User created succesfully',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    })
  }
}

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB()

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    })
  }
}

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const result = await UserServices.getSingleUserFromDB(Number(userId))

    res.status(200).json({
      success: true,
      message: 'User is retrieved succesfully',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    })
  }
}

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId)
    const updatedUserData = { ...req.body, userId }
    const zodParsedData = userUpdateValidationSchema.parse(updatedUserData)
    const result = await UserServices.putUserIntoDB(userId, zodParsedData)

    if (!result) {
      res.status(404).json({
        success: false,
        message: 'User not found!',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
      return
    }

    res.status(200).json({
      success: true,
      message: 'User updated succesfully',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    })
  }
}

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const result = await UserServices.deleteUserFromDB(Number(userId))

    if (!result) {
      res.status(404).json({
        success: false,
        message: 'User not found!',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
      return
    }

    res.status(200).json({
      success: true,
      message: 'User deleted succesfully',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    })
  }
}

export const UserControllers = {
  createUser,
  updateUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
}
