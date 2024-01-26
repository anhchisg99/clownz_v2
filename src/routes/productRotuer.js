import express from 'express'
const productRotuer  = express.Router()
import {createProductCtrl} from '../controllers/productCtrl.js'
import upload from '../utils/fileUpload.js'

productRotuer.post('/',upload.array("files"),createProductCtrl)

export default productRotuer
