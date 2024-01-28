import Product from '../models/product.js'
import Category from '../models/category.js'
import asyncHandler from 'express-async-handler'

export const createProductCtrl = asyncHandler(async (req, res) => {
    const { name, description, price, stock, category, sizes } = req.body

    const convertedImg = req.files.map((file) => file.path)

    //Product exists
    const productExists = await Product.findOne({ name })
    if (productExists) {
        throw new Error("Prodcut exits")

    }
    // find category
    const categoryFound = await Category.findById(category)
    if (!categoryFound) {
        throw new Error("Category not found")

    }
    //create product
    const product = await Product.create({
        name,
        description,
        price,
        stock,
        category,
        sizes,
        images: convertedImg,
        // "colors.colorName":
        // "colors.image":
    })
    await product.save()
    res.json({
        status: "success",
        message: "Product created successfully",
        product
    })
})

export const getAllProductCtrl = asyncHandler(async (req, res) => {
    const products = await Product.find({}).select('name category price ').populate('category','name -_id')
    res.json({
        status: "success",
        products
    })
})

export const getProductCtrl = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        throw new Error("Product not found")
    }
    res.json({
        status: "success",
        message: "Product fetched successfully",
        product
    })
})

export const updateProductCtrl = asyncHandler(async (req,res)=>{
    const {name,description,price,stock} = req.body
    
    const product=  await Product.findByIdAndUpdate(req.params.id,{
        name,description,price,stock
    },{
        new:true,
      runValidators: true,

    })
    res.json({
        status:"success",
        message:"Product updated successfully",
        product
    })
})
//find product based on category
export const getProductBasedOnCategory = asyncHandler(async(req,res)=>{
    const category = req.params.category
    const categoryFound = await Category.findById(category)
    const products = await Product.find({category}).select('name category price').populate('category','name -_id')
    if(!categoryFound){
        throw new Error("Not found category")
    }
    if(!products){

        throw new Error("Not found product")
    }
    res.json({
        status:"success",
        message:"Product fetched successfully",
        products
    })
    
})
// delete product
export const deleteProductCtrl = asyncHandler(async (req,res)=>{
    const Product = await Product.findByIdAndDelete(req.params.id)
    res.json({
        status:"success",
        message:"Product deleted successfully"
    })
})
