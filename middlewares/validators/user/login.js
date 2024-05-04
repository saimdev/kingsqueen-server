const {body} = require('express-validator')

module.exports = ()=> [
    body('email')
        .notEmpty()
        .withMessage('Email cannot be empty')
        .isEmail()
        .withMessage('Invalid email address'),

    body('password')
        .notEmpty()
        .withMessage('Password cannot be empty')
        .isLength({min: 6})
        .withMessage('Password must be at least 6 characters long')
]