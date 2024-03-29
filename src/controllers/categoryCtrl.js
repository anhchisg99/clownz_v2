import asyncHandler from 'express-async-handler'
import Categroy from '../models/category.js'

export const createCategoryCtrl = asyncHandler(async (req, res) => {
    const { name } = req.body
    const categoryFound = await Categroy.findOne({ name })
    if (categoryFound) {
        throw new Error("Category already exists");

    }
    const category = await Categroy.create({ name })
    res.json({
        status: 'success',
        message: 'Category created successfully',
        category
    })
})


export const getAllCategoriesCtrl = asyncHandler(async (req, res) => {
    const categories = await Categroy.find({})

    if (categories === undefined || categories.length == 0) {
        throw new Error("Category have not been created")
    }
    res.json({
        status: "success",
        message: "Categories fetched successfully",
        categories
    })
})
export const deleteCategory = asyncHandler(async (req, res) => {
    await Categroy.findOneAndDelete(req.params.id)
    res.json({
        status: "success",
        message: "Category deleted successfully",

    })
})