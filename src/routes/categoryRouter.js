import express from 'express'
import { 
    createCategoryCtrl,
    getAllCategoriesCtrl
 } from "../controllers/categoryCtrl.js";

const categoriesRouter = express.Router()

categoriesRouter.post('/',createCategoryCtrl)
categoriesRouter.get("/",getAllCategoriesCtrl)

export default categoriesRouter

