import mongoose, { mongo } from 'mongoose'
const Schema = mongoose.Schema

const categorySchema = Schema({
    name:String,
    image:{
        type:String
    },
    
})

export default mongoose.model('Category',categorySchema)