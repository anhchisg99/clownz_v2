import categoriesRouter from "./categoryRouter.js";
import productRotuer from "./productRotuer.js";
import userRouter from  "./userRouter.js"
import orderRouter from  "./orderRouter.js"
function route(app){

    app.use('/user',userRouter)
    app.use('/category',categoriesRouter)
    app.use('/product',productRotuer)
    app.use('/order',orderRouter)

}

export default route