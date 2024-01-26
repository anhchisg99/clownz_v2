import asyncHandler from "express-async-handler"
import generateToken from '../utils/generateToken.js'
import { getTokenFromHeader } from '../utils/getTokenFromHeader.js'
import { verifyToken } from "../utils/verifyToken.js";
import User from "../models/User";

export const registerUserCtrl = asyncHandler(async (req, res) => {
    const { fullname, email, password } = req.body

    const userExits = await User.findOne({ email })
    if (userExits) {
        throw new Error("User already exists")

    }
    const user = await User.create({
        fullname, email, password
    })
    res.status(201).json({
        status: "success",
        message: "User Registered Successfully",
        data:user
    })
})

export async function Login(username,password){
    const user  = await User.findOne({email})
    
    if(!user){
        throw new Error('User not registerd')
    }

    const isValid = await user.isCheckPassword(password)
    if(!isValid){
        throw new Error("Password is wrong")   

    }
    return  user
}