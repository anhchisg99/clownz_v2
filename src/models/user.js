import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const Schema = mongoose.Schema;

const UserShema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    wishLists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "WishList",
      },
    ],
    isAdmin: {
      type: Boolean,
      default: false,
    },
    hasShippingAddress: {
      type: Boolean,
      default: false,
    },
    shippingAddress: {
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      address: {
        type: String,
      },
      city: {
        type: String,
      },
      postalCode: {
        type: String,
      },
      province: {
        type: String,
      },
      country: {
        type: String,
      },
      phone: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);
UserShema.pre('save',async function(next){
  try {
      console.log(`Call before save:::`,this.username,this.password)
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(this.password,salt)
      this.password  = hashPassword
      next()
  } catch (error) {
      next(error)
  }
})
UserShema.methods.isCheckPassword = async function(password){
  try {
      return await bcrypt.compare(password,this.password);
  } catch (error) {
      console.log(error)
  }
}
//compile the schema to model
const User = mongoose.model("User", UserShema);

export default User;
