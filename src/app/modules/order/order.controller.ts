import { orderSchema as orderValidationSchema } from './order.validation'
import { Request, Response } from 'express'
import { OrderServices } from './order.service'

const addProductToUserOrders = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId)
    const orderData = req.body
    const zodParsedData = orderValidationSchema.parse(orderData)
    const result = await OrderServices.addProductToOrderIntoUserDb(
      userId,
      zodParsedData,
    )

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
      message: 'Order created successfully!',
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

const getAllOrdersByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const result = await OrderServices.getAllOrdersByUserIdFromDB(
      Number(userId),
    )
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
      message: 'Order fetched successfully!',
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

const getTotalPriceOfOrdersByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const result = await OrderServices.getTotalPriceOfOrdersByUserIdFromDb(
      Number(userId),
    )
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
      message: 'Total price calculated successfully!',
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

export const OrderControllers = {
  addProductToUserOrders,
  getAllOrdersByUserId,
  getTotalPriceOfOrdersByUserId,
}
