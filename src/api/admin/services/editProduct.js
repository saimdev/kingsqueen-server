const Product = require('../models/Product')

const editProduct = (id, {title, description, price, discount_price, stock, colors, sizes, categories, images}) => {
    console.log(colors)
    return Product.findByIdAndUpdate(id, {
        title,
        description,
        price,
        discountPrice: discount_price,
        stock,
        colors,
        sizes,
        categories,
        images
    }, {new: true})
}


module.exports = editProduct;