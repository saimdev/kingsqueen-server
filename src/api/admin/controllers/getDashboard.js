const Customer = require('../models/Customer');
const Order = require('../models/Order');
const Product = require('../models/Product');

const getDashboard = async (req, res, next) => {
    try {

        // Find new customers in last 30 days
        const newCustomers = await Customer.find({
            createdAt: {
                $gte: new Date(new Date() - 30 * 24 * 60 * 60 * 1000)
            }
        }).countDocuments();

        // Find new orders in last 30 days
        const newOrders = await Order.find({
            createdAt: {
                $gte: new Date(new Date() - 30 * 24 * 60 * 60 * 1000)
            }
        }).countDocuments();

        // Get total products
        const totalProducts = await Product.find().countDocuments();

        // Calculate total sales
        const totalSales = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: '$totalAmount'
                    }
                }
            }
        ]);

        // Create sales chart of last 4 months
        const currentDate = new Date();
        const fourMonthsAgo = new Date();
        fourMonthsAgo.setMonth(currentDate.getMonth() - 4);
        console.log(fourMonthsAgo.getMonth());
        currentDate.setMonth(currentDate.getMonth() - 1);
        console.log(currentDate.getMonth());

        const salesChart = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: fourMonthsAgo, $lt: currentDate },
                },
            },
            {
                $group: {
                    _id: {
                        month: { $month: '$createdAt' },
                        year: { $year: '$createdAt' },
                    },
                    totalSales: { $sum: '$totalAmount' },
                },
            },
            {
                $project: {
                    _id: 0, // Exclude _id from the output
                    month: {
                        $arrayElemAt: [
                            [
                                'January', 'February', 'March',
                                'April', 'May', 'June',
                                'July', 'August', 'September',
                                'October', 'November', 'December'
                            ],
                            '$_id.month'
                        ],
                    },
                    totalSales: 1,
                },
            },
            {
                $sort: {
                    '_id.year': 1,
                    '_id.month': 1,
                },
            },
        ]);


        res.status(200).json({
            success: true,
            message: 'Dashboard Data',
            data: {
                newCustomers: newCustomers,
                newOrders: newOrders,
                totalProducts: totalProducts,
                totalSales: totalSales.length > 0 ? totalSales[0].total : 0,
                salesChart: salesChart,
                categoryChart: '',
            }
        })

    } catch (err) {
        next(err)
    }
}

module.exports = getDashboard;