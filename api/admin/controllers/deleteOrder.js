const Order = require('../models/Order');

const deleteOrder = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Get order
        const order = await Order.findByIdAndDelete(id);

        // Response
        res.status(200).json({
            data: order
        })

    }catch(err){
        next(err)
    }
}

module.exports = deleteOrder;