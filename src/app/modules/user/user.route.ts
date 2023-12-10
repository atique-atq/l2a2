import express from 'express'
import { UserControllers } from './user.controller'

const router = express.Router()

router.post('/', UserControllers.createUser)

router.get('/:userId', UserControllers.getSingleUser)

router.put('/:userId', UserControllers.updateUser)

router.delete('/:userId', UserControllers.deleteUser)

router.get('/', UserControllers.getAllUsers)

export const UserRoutes = router
