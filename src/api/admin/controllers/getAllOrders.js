const Order = require('../models/Order');

const getAllOrders = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) > 0 ? parseInt(req.query.page) : 1;
        const limit = parseInt(req.query.limit) > 0 ? parseInt(req.query.limit) : 4;
        const sort = req.query.sort ? req.query.sort : 'createdAt';
        const order = req.query.order ? req.query.order : 'desc';

        // Get all orders
        const orders = await Order.find()
            .sort({ [sort]: order })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate('user', 'firstName lastName email')
            .exec();

        // Get total orders
        const totalOrders = await Order.find().countDocuments();

        // Response
        res.status(200).json({
            data: orders,
            pagination: {
                current: page,
                pageSize: limit,
                total: totalOrders
            }
        })

    } catch (err) {
        next(err);
    }
}

module.exports = getAllOrders;