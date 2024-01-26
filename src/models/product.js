import mongoose, { mongo } from 'mongoose'
const Schema = mongoose.Schema

const userSchema = Schema({
    name: String,
    description: String,
    price: Number,
    colors: [
        {
            colorName: { type: String },
            image:{type:String}
        }

    ],
    colors: [
        { type: Schema.Types.ObjectId }
    ],
    images: [
        String
    ],
    slug:{
        type:String
    },
    sizes: {
        type: [String],
        enum: ["S", "M", "L", "XL", "XXL"],
        required: true,
    },
    stock: Number,
    slug: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    discount:{
        type:Number
    }
    
}, {
    timestamps: true
})

export default mongoose.model('User', userSchema)