
import productData from './src/data/productData.js'
import { connectDB } from './src/config/connectDB.js'
import Product from './src/models/product.js'

connectDB()


const importData = async () => {
  try {
    await Product.deleteMany({})

    await Product.insertMany(productData)

    console.log('Data Import Success')

    process.exit()
  } catch (error) {
    console.error('Error with data import', error)
    process.exit(1)
  }
}

importData()
