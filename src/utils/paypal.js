import paypal from 'paypal-rest-sdk'

const { PAYPAL_MODE, PAYPAL_CLIENT_KEY, PAYPAL_SECRET_KEY } = process.env

paypal.configure({
    'mode': PAYPAL_MODE,
    'client_id': PAYPAL_CLIENT_KEY,
    'client_secret': PAYPAL_SECRET_KEY
})


const payProduct = async (req, res) => {
    try {
        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:3000/order/success",
                "cancel_url": "http://localhost:3000/order/cancel"
            },
            "transactions": [{
                "item_list": {

                    "items": [{
                        "name": "book",
                        "sku": "001",
                        "price": "25.00",
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": "25.00"
                },
                "description": "Hat for the best team ever"
            }],
        }
        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                throw error
            } else {
                for (let i = 0; i < payment.links.length; i++) {
                    if (payment.links[i].rel === 'approval_url') {
                        res.redirect(payment.links[i].href)
                    }
                }
            }
        })
    } catch (error) {

    }
}

export {
    payProduct
}