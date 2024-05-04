const Product = require('../models/Product')

const getSingleProduct = (id, fields = null) => {
    return Product.findById(id, fields);
}

module.exports = getSingleProduct