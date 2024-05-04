const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { generateOrderNumber } = require('../../../utils');
const Order = require('../../admin/models/Order');
const PendingPayment = require('../../admin/models/PendingPayment');
const Customer = require('../../admin/models/Customer');

const createCheckoutSession = async (req, res, next) => {
    try {
        const { shippingAddress, products } = req.body;
 
        const line_items = products.map(product => {
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: product.title,
                    },
                    unit_amount: product.price * 100,
                },
                quantity: product.qty,
            }
        })

        // Create Order
        const orderNumber = generateOrderNumber();
        const order = new Order({
            orderNumber,
            user: req.user._id,
            userName: req.user.firstName + ' ' + req.user.lastName,
            userEmail: req.user.email,
            items: products,
            shippingAddress: JSON.stringify(shippingAddress),
            totalAmount: products.reduce((acc, product) => acc + product.price * product.qty, 0),
            orderStatus: 'Pending Payment',
        });
        await order.save();

        // Create Customer
        const existCustomer = await Customer.findOne({ user: req.user._id });
        if (!existCustomer) {
            const customer = new Customer({
                user: req.user._id,
                orders: [order._id],
            });
            await customer.save();
        } else {
            existCustomer.orders.push(order._id);
            await existCustomer.save();
        }

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            payment_intent_data: {
                metadata: {
                    customer_id: req.user._id.toString(),
                    order_id: order._id.toString(),
                    shipping_address: JSON.stringify(shippingAddress),
                },
            },
            success_url: 'http://localhost:5173/payment-status/success',
            cancel_url: 'http://localhost:5173/payment-status/faild',
        });

        // Create Pending Payment
        const pendingPayment = new PendingPayment({
            order: order._id,
            paymentUrl: session.url,
        });
        await pendingPayment.save();

        // Send Email to Customer

        console.log(session.url)
        res.status(200).json({
            session_url: session.url
        })

    }catch(err){
        next(err);
    }
}

module.exports = createCheckoutSession;