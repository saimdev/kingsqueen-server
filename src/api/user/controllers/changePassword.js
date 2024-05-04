const User = require('../models/User');
const {formattedValidationResult} = require('../../../utils');

const changePassword = async (req, res, next) => {
    try{

        const {user} = req
        
        const validationErrors = formattedValidationResult(req);

        if(validationErrors){
            return res.status(400).json({
                data: validationErrors
            })
        }

        const {newPassword} = req.body

        const userData = await User.findById(user._id);
        userData.password = newPassword;
        await userData.save();

        return res.status(200).json({
            message: 'Password changed successfully'
        })

    }catch(err){
        next(err)
    }
}

module.exports = changePassword