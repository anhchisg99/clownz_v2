//Color schema
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ColorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    images: {
      type:String
    },
  },
  { timestamps: true }
);

const Color = mongoose.model("Color", ColorSchema);

export default Color;