import express from 'express'
const orderRouter = express.Router()

import { 
    createOrderCtrl,
    paypalSuccess,
    paypalCancel
 } from '../controllers/orderCtrl.js'
import { payProduct } from '../utils/paypal.js'
import { verifyAccessToken } from '../utils/jwt_service.js'

orderRouter.post('/',verifyAccessToken,createOrderCtrl)
orderRouter.post('/pay',payProduct)
orderRouter.get('/success',paypalSuccess)
orderRouter.get('/cancel',paypalCancel)
export default orderRouter