const Order = require('../models/Order');

const editOrder = async (req, res, next) => {
    try{

        const {id} = req.params;
        const {orderStatus} = req.body;

        console.log(orderStatus)
        console.log(id)
        // Get order
        const order = await Order.findByIdAndUpdate(id, {orderStatus}, {new: true});

        // Response
        res.status(200).json({
            data: order
        })

    }catch(err){
        next(err)
    }
}

module.exports = editOrder;