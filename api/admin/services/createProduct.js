const {CustomError} = require('../../../utils');
const Product = require('../models/Product');

const createProduct = ({title, description, price, discount_price, stock, colors, sizes, categories, images}) => {
    const product = new Product({
        title,
        description,
        price,
        discountPrice: discount_price,
        stock,
        colors,
        sizes,
        categories,
        images
    })

    return product.save();
}

module.exports = createProduct;