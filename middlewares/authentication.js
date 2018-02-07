const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connectMongo = require('../database/mongoConnector');

const mongo = connectMongo();

passport.use(new LocalStrategy({
  usernameField: 'variables[username]',
  passwordField: 'variables[password]'
}, async (username, password, done) => {
    const db = await mongo;
    const Users = db.Users;
    try {
      const user = await Users.findOne({ username });
      if(username === user.username && password === user.password) {
        console.log('2) return true for user in auth file', user.username);
        return done(null, user)
      }
    } catch (error) {
      console.error(`An error occured: ${error}`);
    }
}));

passport.serializeUser((user, done) => {
  console.log('4) inside serializeUser', user.username);
  done(null, user._id);
});

const middleware = express();
middleware.use(passport.initialize());
middleware.use(passport.session());
module.exports = middleware;
