const mongoose = require('mongoose');


// Define the order schema
const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  items: [], // Embedded product schema
  shippingAddress: String, // Embedded address schema for shipping
  totalAmount: {
    type: Number,
    required: true
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  orderStatus: {
    type: String,
    enum: ['Pending Payment', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  discount: {
    type: Number,
    default: 0
  }
}, {timestamps: true});

// Create the Order model based on the schema
const Order = mongoose.model('Order', orderSchema);

// Export the Order model
module.exports = Order;
