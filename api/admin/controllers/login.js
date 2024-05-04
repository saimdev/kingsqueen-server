const Admin = require('../models/Admin');
const { tokenUtils, CustomError } = require('../../../utils')

const login = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        console.log(req.body)
        // Check if user exists
        const admin = await Admin.findOne({ email });
        if (!admin) {
            throw new CustomError(401, 'Invlid Credentials');
        }

        // Check if password is correct
        if (password !== admin.password) {
            throw new CustomError(401, 'Invalid Credentials');
        }

        // Generate token
        const token = tokenUtils.generateToken({ id: admin._id });

        // Send response
        const cookieOpt = {
            expires: new Date(Date.now() + 24 * 3600000),
            httpOnly: true,
            path: '/',
        };

        const adminData = admin.toObject();
        delete adminData.password;
        res.status(200).cookie('_auth_admin', token, cookieOpt).json({
            message: 'Admin loggedin successfully',
            data: adminData,
        });

    } catch (error) {
        next(error);
    }
}

module.exports = login;