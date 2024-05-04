const {body} = require('express-validator')
const User = require('../../../api/user/models/User');


module.exports = ()=> [
    body('regEmail')
        .exists()
        .withMessage('Email is required')
        .notEmpty()
        .withMessage('Email cannot be empty')
        .isEmail()
        .withMessage('Email is not valid')
        .custom(async (email) => {
            const existUser = await User.findOne({email});

            if (existUser) {
                throw new Error('Email already in use');
            }
        }),

    body('regPassword')
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .withMessage('Password cannot be empty')
        .isLength({min: 6})
        .withMessage('Password must be at least 6 characters long'),

    body('firstName')
        .exists()
        .withMessage('First name is required')
        .notEmpty()
        .withMessage('First name cannot be empty')
        .isLength({min: 3})
        .withMessage('First name must be at least 3 characters long'),
]