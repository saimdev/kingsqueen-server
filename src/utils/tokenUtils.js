const jwt = require('jsonwebtoken');

exports.generateToken = (payload, expire = '1d', secretkey = process.env.SECRET_KEY)=>{
    return jwt.sign(payload, secretkey, {expiresIn: expire});
}

exports.verifyToken = (token, secretkey = process.env.SECRET_KEY)=>{
    return jwt.verify(token, secretkey);
}