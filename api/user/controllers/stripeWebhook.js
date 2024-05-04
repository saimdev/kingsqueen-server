const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../../admin/models/Order');
const PendingPayment = require('../../admin/models/PendingPayment');

const endpointSecret = "whsec_7434b435bad815d6b4f6b0a6eb76b572a69161a3432f7beb551cfeded6969ae3";


const changeOrderStatus = async (paymentIntentSucceeded) => {
    try{
        // Change Order Status
        const order = await Order.findById(paymentIntentSucceeded.metadata.order_id);
        order.orderStatus = 'Processing';
        await order.save();

        // Remove Pending Payment
        await PendingPayment.findOneAndDelete({ order: order._id });

        // Send Email to Customer

    }catch(err){

    }
}

const stripeWebhook = async (request, response) => {
    const sig = request.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
        console.log(err)
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntentSucceeded = event.data.object;
            
            // Change Order Status
            changeOrderStatus(paymentIntentSucceeded);

            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.json({received: true});
}

module.exports = stripeWebhook;