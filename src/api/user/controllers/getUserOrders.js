const Order = require('../../admin/models/Order');

const getUserOrders = async (req, res, next) => {
    try{

        const userId = req.user._id;

        const orders = await Order.find({user: userId});

        res.status(200).json({
            data: orders
        })

    }catch(err){
        next(err);
    }
}

module.exports = getUserOrders;