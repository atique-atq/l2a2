import { Schema, model } from 'mongoose'
import { TUser, TFullName, TAddress, TOrder, UserModel } from './user.interface'
import config from '../../config'
import bcrypt from 'bcrypt'
const fullNameSchema = new Schema<TFullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
})

const addressSchema = new Schema<TAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
})

const orderSchema = new Schema<TOrder>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
})

const userSchema = new Schema<TUser, UserModel>(
  {
    userId: { type: Number, required: true, unique: true },
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters long'],
    },
    fullName: {
      type: fullNameSchema,
      required: [true, 'Full Name is required'],
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
      min: [0, 'Age can not be less than 0'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    hobbies: { type: [String], required: [true, 'Hobbies are required'] },
    address: { type: addressSchema, required: [true, 'Address is required'] },
    orders: [{ type: orderSchema }],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
)

userSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook : we will save  data');
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})

userSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

userSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

userSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

userSchema.statics.isUserExists = async function (id: number) {
  const existingUser = await User.findOne({ id })
  return existingUser
}

export const User = model<TUser, UserModel>('User', userSchema)
