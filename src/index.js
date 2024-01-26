import dotenv from "dotenv";
dotenv.config();

import express from 'express'
const app = express()
const port =3000
import route from './routes/index.js'
import bodyParser from 'body-parser'
import {connectDB} from '../src/config/connectDB.js'


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

connectDB()


app.get('/',(req,res)=>{
    res.send('success')
})

route(app)
app.listen(port,()=>{console.log(`listen in ${port}!!`)})