import express from 'express'
import { createCategoryCtrl } from "../controllers/categoryCtrl.js";

const categoriesRouter = express.Router()

categoriesRouter.post('/',createCategoryCtrl)

export default categoriesRouter

