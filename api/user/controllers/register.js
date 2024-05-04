const {formattedValidationResult, CustomError, tokenUtils} = require('../../../utils')
const User = require('../models/User')

const register = async (req, res, next) => {
    try {
        const { body } = req;

        const validationErrors = formattedValidationResult(req);
        if (validationErrors) {
            throw new CustomError(400, 'Check input fields again', validationErrors);
        }

        // Check if user already exists
        const existUser = await User.findOne({ email: body.email });
        if (existUser) {
            throw new CustomError(400, 'User already exists');
        }

        // Create new user
        const newUser = new User({
            firstName: body.firstName,
            lastName: body.lastName,
            dob: body.dob,
            email: body.regEmail,
            password: body.regPassword,
            gender: body.gender
        });
        await newUser.save();

        // Generate token
        const token = tokenUtils.generateToken({ id: newUser._id  });

        // Send response
        const cookieOpt = {
            expires: new Date(Date.now() + 24 * 3600000),
            httpOnly: true
        };

        const userData = newUser.toObject();
        delete userData.password;
        res.status(201).cookie('_auth', token, cookieOpt).json({
            message: 'User registered successfully',
            data: userData
        });

    } catch (error) {
        next(error);
    }
}

module.exports = register;