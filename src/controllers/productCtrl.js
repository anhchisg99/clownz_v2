import Product from '../models/product.js'
import Category from '../models/category.js'
import asyncHandler from 'express-async-handler'

export const createProductCtrl = asyncHandler(async (req,res)=>{
    const {name,description,price,stock,category,sizes} = req.body

    const convertedImg = req.files.map((file)=>file.path)

    //Product exists
    const productExists = await Product.findOne({name})
    if(productExists){
        throw new Error("Prodcut exits")

    }
    // find category
    const categoryFound = await Category.findById(category)
    if(!categoryFound){
        throw new Error("Category not found")

    }
    //create product
    const product =  await Product.create({
        name,
        description,
        price,
        stock,
        category,
        sizes,
        images:convertedImg,
        // "colors.colorName":
        // "colors.image":
    })
    await product.save()
    res.json({
        status:"success",
        message:"Product created successfully",
        product
    })
})
