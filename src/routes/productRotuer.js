import express from 'express'
const productRotuer = express.Router()
import { 
    createProductCtrl,
    getAllProductCtrl,
    getProductCtrl,
    deleteProductCtrl,
    getProductBasedOnCategory
 } from '../controllers/productCtrl.js'
import upload from '../utils/fileUpload.js'

productRotuer.post('/', upload.array("files"), createProductCtrl)
productRotuer.get('/:id',getProductCtrl)
productRotuer.get('/',getAllProductCtrl)
productRotuer.get('/category/:category',getProductBasedOnCategory)
productRotuer.delete('/:id',deleteProductCtrl)
export default productRotuer
