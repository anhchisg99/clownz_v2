import express from 'express'
const userRouter = express.Router()
import { loginUserCtrl,registerUserCtrl } from '../controllers/userCtrl.js'


userRouter.post('/register',registerUserCtrl)
userRouter.post('/login',loginUserCtrl)



export default userRouter