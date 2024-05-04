const Product = require('../models/Product')

const deleteProduct = (id) => {
    return Product.findByIdAndDelete(id);
}

module.exports = deleteProduct;