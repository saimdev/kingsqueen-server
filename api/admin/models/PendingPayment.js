const mongoose = require('mongoose');

const pendingPaymentSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    paymentUrl: {
        type: String,
        required: true
    }
}, { timestamps: true });

const PendingPayment = mongoose.model('PendingPayment', pendingPaymentSchema);

module.exports = PendingPayment;