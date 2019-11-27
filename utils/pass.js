'use strict';
const bcrypt = require('bcryptjs');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const userModel = require('../models/userModel');

// local strategy for username password login
passport.use(new Strategy(
    async (username, password, done) => {
      const params = [username];
      try {
        const [user] = await userModel.getUserLogin(params);
        console.log('Local strategy', user); // result is binary row
        if (user === undefined) {
          return done(null, false);
        }
        // TODO: use bcrypt to check of passwords don't match
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false);
        }
        delete user.password;
        return done(null, {...user}); // use spread syntax to create shallow copy to get rid of binary row type
      }
      catch (err) {
        return done(err);
      }
    }));

// TODO: JWT strategy for handling bearer token
passport.use(new JWTStrategy({
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'ilenWksp2019',
    },
    async (jwtPayload, done) => {
      console.log('payload', jwtPayload);
      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      try {
        const [user] = await userModel.getUser(jwtPayload.user_id);
        if (user === undefined)
          return done(null, false);

        return done(null, {...user});
      }
      catch (err) {
        return done(err);
      }
    },
));

module.exports = passport;
