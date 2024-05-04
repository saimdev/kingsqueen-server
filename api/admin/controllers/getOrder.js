const Order = require('../models/Order');

const getOrder = async(req, res, next)=> {
    try{
        const {id} = req.params;

        // Get order
        const order = await Order.findById(id)
            .populate('user', 'firstName lastName email')
            .exec();

        // Response
        res.status(200).json({
            data: order
        })
    }catch(err){
        next(err)
    }
}

module.exports = getOrder;