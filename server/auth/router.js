const express = require('express');
const passport = require('passport');
const router = express.Router();
const { signUp, signIn, signOut } = require('./controller');

router.post('/api/signup', signUp);
router.post(
  '/api/signin',
  passport.authenticate('local', { failureRedirect: '/login?error=1' }),
  signIn
);
router.get('/api/signout', signOut);

router.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get("/auth/github/callback", passport.authenticate("github"), (req, res) => {
  res.redirect("/profile/" + req.user._id);
});


module.exports = router;
