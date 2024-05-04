const User = require('../models/User');
const { tokenUtils, CustomError } = require('../../../utils')

const login = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            throw new CustomError(401, 'Invlid Credentials');
        }

        // Check if password is correct
        if (password !== user.password) {
            throw new CustomError(401, 'Invalid Credentials');
        }

        // Generate token
        const token = tokenUtils.generateToken({ id: user._id });

        // Send response
        const cookieOpt = {
            expires: new Date(Date.now() + 24 * 3600000),
            httpOnly: true,
            domain: 'localhost',
            path: '/',
        };

        const userData = user.toObject();
        delete userData.password;
        res.status(200).cookie('_auth', token, cookieOpt).json({
            message: 'User loggedin successfully',
            data: userData
        });

    } catch (error) {
        next(error);
    }
}

module.exports = login;