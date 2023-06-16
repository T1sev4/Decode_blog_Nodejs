const passport = require('passport');
const User = require('../auth/User');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local');
const GitHubStrategy = require('passport-github2').Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    function (email, password, done) {
      User.findOne({ email })
        .then((user) => {
          bcrypt.compare(password, user.password, function (err, result) {
            if (err) {
              return done(err);
            }
            if (result) {
              return done(null, user);
            }
          });
        })
        .catch((e) => {
          return done(e);
        });
    }
  )
);

passport.use(new GitHubStrategy(
  {
    clientID: '51d171cee46de115a99c',
    clientSecret: '4b59656ce18a515611c106a63a6b5be00c10d575',
    callbackURL: "http://localhost:8000/auth/github/callback",
    scope: ['openid', 'email', 'profile']
  },
  async function(accessToken, refreshToken, profile, cb) {
      // const user = await User.findOne({ GitHubID: profile.id })
      const newUser = await new User({
        GitHubID: profile.id,
        full_name: profile.username,
      }).save();

      return cb(null, newUser);
      // if(!user){
      //   const newUser = await new User({
      //     GitHubID: profile.id,
      //     full_name: profile.username,
      //     email: profile.emails[0].value
      //   }).save()

      //   return cb(null, newUser);
      // }else{
      //   console.log('GitHub user already exist')
      //   return cb(null, null)
      // }
  }
));

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id).then((user, err) => {
    done(err, user);
  });
});
