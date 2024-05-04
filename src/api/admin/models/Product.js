const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        min: 0,
    },
    discountPrice: {
        type: Number,
        min: 0,
    },
    categories: {
        type: [String],
        required: true
    },
    images: {
        type: [String],
    },
    stock: {
        type: Number,
        min: 0
    },
    colors: {
        type: [String]
    },
    sizes: {
        type: [String]
    },
    published: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;