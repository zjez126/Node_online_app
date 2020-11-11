const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, async(jwt_payload, done) => {
        // console.log(jwt_payload);
        const user = await User.findById(jwt_payload.id);
        if (!user) {
            return done(new ErrorResponse("此用户不存在", 400))
        }
        return done(null, user)

    }));
}