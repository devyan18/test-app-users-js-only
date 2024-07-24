import { model, Schema } from 'mongoose'
import { compareHash, hashStr } from '../../utils/encrypt.js'

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  avatar: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
})

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await hashStr(this.password)
  }

  if (this.isModified('username')) {
    const username = this.username
    // Capitalize the first letter
    this.username = username.charAt(0).toUpperCase() + username.slice(1)
  }

  next()
})

userSchema.pre('findOneAndUpdate', async function (next) {
  if (this._update.password) {
    this._update.password = await hashStr(this._update.password)
  }
  next()
})

userSchema.set('toJSON', {
  transform: (doc, { __v, password, ...rest }, options) => {
    rest.id = rest._id.toString()
    delete rest._id
    return rest
  }
})

userSchema.methods.comparePassword = async function (password) {
  return await compareHash(password, this.password)
}

export const UserModel = model('User', userSchema)
