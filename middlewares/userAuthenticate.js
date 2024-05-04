const passport = require('passport');

const userAuthenticate = (req, res, next) => {
    return passport.authenticate('jwt', { session: false}, function(err, user, info, status) {
        if (err) return next(err);
        if (!user) return res.status(401).json({message: 'Unauthorize access'});
        user = user.toObject();
        delete user.password;
        req.user = user;
        next()
    })(req, res, next)
}

module.exports = userAuthenticate;