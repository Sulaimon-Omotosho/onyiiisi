import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    uid: {
      type: String,
      // unique: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    is_admin: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
    softDelete: {
      type: Boolean,
      default: false,
    },
    lastLoginAt: {
      type: String,
      default: Date.now(),
    },
    deletedAt: String,
    provider: String,
    image: String,
    bio: String,
    lastLoginIp: String,
    city: String,
    state: String,
    country: String,

    phoneNumber: String,

    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  { timestamps: true }
)

const User = mongoose.models.User || mongoose.model('User', UserSchema)
// const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User
