const {body} = require('express-validator');


module.exports = ()=>{
    return [
        body('title')
        .notEmpty().withMessage('Title can not be empty!')
        .isString().withMessage('Title must be string!')
        .escape(),

        body('description')
        .isString().withMessage('Description must be string')
        .escape(),

        body('price')
        .isNumeric().withMessage('Price must be numeric!'),

        body('discount_price')
        .isNumeric().withMessage('Discount Price must be numeric!'),

        body('stock')
        .isNumeric().withMessage('Stock must be numeric!'),
    ]
}