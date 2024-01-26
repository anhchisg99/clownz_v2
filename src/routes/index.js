import categoriesRouter from "./categoryRouter.js";
import productRotuer from "./productRotuer.js";

function route(app){
    app.use('/category',categoriesRouter)
    app.use('/product',productRotuer)

}

export default route