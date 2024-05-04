const PendingPayment = require('../../admin/models/PendingPayment');

const getPendingPayment = async (req, res, next) => {
    try{

        const { orderId } = req.params;

        const pendingPayment = await PendingPayment.findOne({order: orderId});

        res.status(200).json({
            data: pendingPayment
        })

    }catch(err){
        next(err);
    }
}

module.exports = getPendingPayment;