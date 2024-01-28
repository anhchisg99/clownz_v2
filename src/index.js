import dotenv from "dotenv";
dotenv.config();

import express from 'express'
const app = express()
const port = process.env.PORT || 3000
import route from './routes/index.js'
import bodyParser from 'body-parser'
import {connectDB} from '../src/config/connectDB.js'
import createError from 'http-errors'


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

connectDB()


app.get('/',(req,res)=>{
    res.send('success')
})
route(app)

//catch not exiting route
app.use((req,res,next)=>{
    next(createError.NotFound('this route does not exits'))
})
app.use((err,req,res,next)=>{
    res.json({
        status:err.status||500,
        message:err.message
    })
})


app.listen(port,()=>{console.log(`listen in ${port}!!`)})