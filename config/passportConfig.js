const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const User = require('../api/user/models/User');

const cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies) {
        token = req.cookies['_auth'];
    }
    return token;
};


const opts = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.SECRET_KEY
}


passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findById(jwt_payload.id)
    .then(user => {
        if(user) return done(null, user);
        return done(null, false);
    })
    .catch(err => done(err, false));
}));


module.exports = passport