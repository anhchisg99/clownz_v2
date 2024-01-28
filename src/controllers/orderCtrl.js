import asyncHandler from "express-async-handler";
// import dotenv from "dotenv";
// dotenv.config();
// import Order from '../models/order.js'
import Product from "../models/product.js";
import User from '../models/user.js'
// import { verifyAccessToken } from '../utils/jwt_service.js'ow

export const createOrderCtrl = asyncHandler(async (req, res) => {
    // //get teh coupon
    // const { coupon } = req?.query;

    // const couponFound = await Coupon.findOne({
    //   code: coupon?.toUpperCase(),
    // });
    // if (couponFound?.isExpired) {
    //   throw new Error("Coupon has expired");
    // }
    // if (!couponFound) {
    //   throw new Error("Coupon does exists");
    // }

    //get discount
    // const discount = couponFound?.discount / 100;

    //Get the payload(customer, orderItems, shipppingAddress, totalPrice);
    const { orderItems, shippingAddress, totalPrice } = req.body;
    console.log(req.body);
    //Find the user
    const user = await User.findById(req.payload.id);
    //Check if user has shipping address
    if (!user?.hasShippingAddress) {
        throw new Error("Please provide shipping address");
    }
    //Check if order is not empty
    if (orderItems?.length <= 0) {
        throw new Error("No Order Items");
    }
    //Place/create order - save into DB
    const order = await Order.create({
        user: user?._id,
        orderItems,
        shippingAddress,
        // totalPrice: couponFound ? totalPrice - totalPrice * discount : totalPrice,
        totalPrice,
    });

    //Update the product qty
    const products = await Product.find({ _id: { $in: orderItems } });

    orderItems?.map(async (order) => {
        const product = products?.find((product) => {
            return product?._id?.toString() === order?._id?.toString();
        });
        if (product) {
            product.totalSold += order.qty;
        }
        await product.save();
    });
    //push order into user
    user.orders.push(order?._id);
    await user.save();

    //make payment (stripe)
    //convert order items to have same structure that stripe need
    const convertedOrders = orderItems.map((item) => {
        return {
            price_data: {
                currency: "usd",
                product_data: {
                    name: item?.name,
                    description: item?.description,
                },
                unit_amount: item?.price * 100,
            },
            quantity: item?.qty,
        };
    });
    const session = await stripe.checkout.sessions.create({
        line_items: convertedOrders,
        metadata: {
            orderId: JSON.stringify(order?._id),
        },
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
    });
    res.send({ url: session.url });
});

//@desc get all orders
//@route GET /api/v1/orders
//@access private

export const getAllordersCtrl = asyncHandler(async (req, res) => {
    //find all orders
    const orders = await Order.find().populate("user");
    res.json({
        success: true,
        message: "All orders",
        orders,
    });
});

//@desc get single order
//@route GET /api/v1/orders/:id
//@access private/admin

export const getSingleOrderCtrl = asyncHandler(async (req, res) => {
    //get the id from params
    const id = req.params.id;
    const order = await Order.findById(id);
    //send response
    res.status(200).json({
        success: true,
        message: "Single order",
        order,
    });
});

//paypal success
export const paypalSuccess = asyncHandler(async (req,res)=>{
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "25.00"
            }
        }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log(JSON.stringify(payment));
            res.send('Success');
        }
    });
})
export const paypalCancel = asyncHandler(async (req,res)=>{
    res.send('fail')
})