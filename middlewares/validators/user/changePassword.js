const {body} = require('express-validator');
const User = require('../../../api/user/models/User');

module.exports = ()=> [
    body('currentPassword')
        .notEmpty().withMessage('Current password cannot be empty')
        .custom(async (currentPassword, {req, res, next}) => {
            try{
                const {user} = req
                const userData = await User.findById(user._id);
                
                if(userData.password !== currentPassword){
                    return Promise.reject('Current password is incorrect')
                }

                return true
            }catch(err){
                next(err)
            }
        }),

    body('newPassword')
        .notEmpty().withMessage('New password cannot be empty')
        .isLength({min: 6}).withMessage('New password must be at least 6 characters long'),
]