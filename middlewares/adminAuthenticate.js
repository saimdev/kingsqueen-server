const Admin = require('../api/admin/models/Admin');
const {CustomError, tokenUtils} = require('../utils');

const adminAuthenticate = async (req, res, next) => {
    try{

        const cookie = req.cookies['_auth_admin'];
        console.log(cookie);
        if (!cookie) throw new CustomError('401', 'Unauthorized access');

        const data = tokenUtils.verifyToken(cookie);

        let admin = await Admin.findById(data.id);
        if (!admin) throw new CustomError('401', 'Unauthorized access');

        console.log(admin);

        admin = admin.toObject();
        delete admin.password;

        req.admin = admin;

        next();

    }catch(err){
        next(err);
    }
}

module.exports = adminAuthenticate;