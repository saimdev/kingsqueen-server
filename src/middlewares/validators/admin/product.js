const Joi = require('joi');

module.exports = () => {
    return [
        (req, res, next) => {
            const schema = Joi.object({
                title: Joi.string().required().messages({
                    'string.base': 'Title must be a string!',
                    'any.required': 'Title cannot be empty!'
                }),
                description: Joi.string().messages({
                    'string.base': 'Description must be a string!'
                }),
                price: Joi.number().messages({
                    'number.base': 'Price must be numeric!'
                }),
                discount_price: Joi.number().messages({
                    'number.base': 'Discount Price must be numeric!'
                }),
                stock: Joi.number().messages({
                    'number.base': 'Stock must be numeric!'
                })
            });
            
            const validationResult = schema.validate(req.body);
            if (validationResult.error) {
                return res.status(400).json({ error: validationResult.error.details[0].message });
            }
            next();
        }
    ];
};
