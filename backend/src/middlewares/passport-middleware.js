const passport = require('passport')
const { Strategy } = require('passport-jwt')
const { SECRET } = require('../constants')
const { User } = require('../models/');

const cookieExtractor = function (req) {
    let token = null
    if (req && req.cookies) token = req.cookies['token']
    return token
}

const opts = {
    secretOrKey: SECRET,
    jwtFromRequest: cookieExtractor,
}

passport.use(
    new Strategy(opts, async ({ id }, done) => {
        try {
            console.log(id);
            const user = await User.findOne({ where: { id: id } })
            if (!user) {
                throw new Error('401 not authorized')
            }

            return done(null, user)
        } catch (error) {
            console.log(error.message)
            done(null, false)
        }
    })
)

exports.userAuth = passport.authenticate('jwt', { session: false })
