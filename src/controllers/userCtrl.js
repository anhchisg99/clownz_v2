import asyncHandler from "express-async-handler"
import generateToken from '../utils/generateToken.js'
import { getTokenFromHeader } from '../utils/getTokenFromHeader.js'
import { verifyToken } from "../utils/verifyToken.js";
import { signAccessToken, verifyAccessToken } from "../utils/jwt_service.js";
import User from "../models/user.js";

export const registerUserCtrl = asyncHandler(async (req, res) => {
    const { fullname, email, password, phone } = req.body

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
        data: user
    })
})


export const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('User not registerded')
    }
    const isValid = await user.isCheckPassword(password)
    if (!isValid) {
        throw new Error("Password is wrong")
    }
    const accessToken = await signAccessToken(user._id)

    res.json({ accessToken })
})