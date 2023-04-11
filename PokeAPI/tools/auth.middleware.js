const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');


const init = () => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
        secretOrKey: 'thisIsSecret'
    };
    passport.use(new JwtStrategy(opts, (decoded, done) => {
        //console.log('Decoded: ', decoded);
        return done(null, decoded);
    }));
};

const protectWithJwt = (req, res, next) => {
    if (req.path == '/' || req.path == '/auth/login' || req.path == '/auth/signup'){
        return next();
    }
    return passport.authenticate('jwt', {session: false})(req, res, next);
};

exports.init = init;
exports.protectWithJwt = protectWithJwt;