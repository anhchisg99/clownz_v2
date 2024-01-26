import asyncHandler from 'express-async-handler'
import Categroy from '../models/category.js'

export const createCategoryCtrl = asyncHandler(async (req,res)=>{
    const {name } = req.body
    const categoryFound = await Categroy.findOne({name})
    if(categoryFound){
        throw new Error("Category already exists");

    }
    const category = await Categroy.create({name})
    res.json({
        status:'success',
        message:'Category created successfully',
        category
    })
})


