const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use('signup',
    new localStrategy({
        mail: 'email',
        phone: 'phone',
        username: 'usernmae',
        password: 'password'
    },

        async (email, phone, username, password, done) => {
            try {
                const user = await User.create({ email, password });
                return done(null, user);
            } catch (e) {
                done(e);
            }
        }
    ));

passport.use('login',
    new localStrategy({
        mail: 'email',
        phone: 'phone',
        username: 'usernmae',
        password: 'password'
    },

        async (email, phone, username, password, done) => {
            try {
                const user = await User.findOne({ email });
                if (!user) {
                    return done(null, false, { message: 'User not found' });
                }

                const validate = await user.isValidPassword(password);

                if (!validate) {
                    return done(null, false, { message: 'Wrong password' });
                }

                return done(null, user, { message: 'Login succesfully' });
            } catch (e) {
                return done(e);
            }
        }
    ));

passport.use(new JWTStrategy(
    {
        secretOrKey: 'top_secret',
        jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
    },

    async (token, done) => {
        try {
            return done(null, token.user);
        } catch (e) {
            done(error);
        }
    }
));
