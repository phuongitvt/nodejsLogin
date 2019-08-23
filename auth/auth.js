const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;

const db = require('../models/index');
const UserModel = db.sequelize.models.User;
const bcrypt = require('bcrypt');
 
// handle user registration
passport.use('signup', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  try {
    
    const { firstName, lastName, role } = req.body;

    user = await UserModel.create({ email: email, password: password, firstName: firstName, lastName: lastName, role });

    return done(null, user);
  } catch (error) {
    console.log(error);
    done(error);
  }
}));

// handle user login
passport.use('login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, async (email, password, done) => {
    try {
      const user = await UserModel.findOne({ where: {email: email} });
      if (!user) {
        return done(null, false, { message: 'User not found' });
      }
      const validate = await bcrypt.compareSync(password, user.password);
      if (!validate) {
        return done(null, false, { message: 'Wrong Password' });
      }
      return done(null, user, { message: 'Logged in Successfully' });
    } catch (error) {
      console.log('lỗi khi dang nhap');
      return done(error);
    }
  }));
   
  // verify token is valid
  passport.use(new JWTstrategy({
    secretOrKey: 'top_secret',
    jwtFromRequest: function (req) {
      let token = null;
      if (req && req.cookies) token = req.cookies['jwt'];
      return token;
    }
  }, async (token, done) => {
    try {
      return done(null, token.user);
    } catch (error) {
      console.log('lỗi khi tạo cookie');
      done(error);
    }
  }));