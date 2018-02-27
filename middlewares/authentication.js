const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connectMongo = require('../database/mongoConnector');

const mongo = connectMongo();
const middleware = express();


passport.use(new LocalStrategy({
  usernameField: 'variables[email]',
  passwordField: 'variables[password]'
}, async (email, password, done) => {
    const db = await mongo;
    const Users = db.Users;
    try {
      const user = await Users.findOne({ 'email': email });
      const passwordCheck = await bcrypt.compare(password, user.password)

      if(email === user.email && passwordCheck) {
        console.log('2) return true for user in auth file', user.email);
        return done(null, user)
      } else {
        return done(null, false);
      }
    } catch (err) {
      console.error(`An error occured: ${err}`);
      return done(null, false, { message: err});
    }
}));

passport.serializeUser((user, done) => {
  console.log('4) inside serializeUser', user.email);
  done(null, user._id);
});

middleware.use(passport.initialize());
middleware.use(passport.session());
module.exports = middleware;
