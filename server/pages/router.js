const express = require('express');
const router = express.Router();
const Categories = require('../Categories/Categories');
const User = require('../auth/User');
const Blogs = require('../Blogs/Blog');
router.get('/', async (req, res) => {
  const allCategories = await Categories.find();
  res.render('index', {
    categories: allCategories,
    user: req.user ? req.user : {},
  });
});

router.get('/profile/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.render('profile', { user: user, loginUser: req.user });
  } else {
    res.redirect('/not-found');
  }
});
router.get('/blogDetail', (req, res) => {
  res.render('blog-detail', { user: req.user ? req.user : {} });
});
router.get('/newBlog', async (req, res) => {
  const allCategories = await Categories.find();
  res.render('new-blog', {
    categories: allCategories,
    user: req.user ? req.user : {},
  });
});
router.get('/editBlog', async (req, res) => {
  const allCategories = await Categories.find();
  res.render('edit-blog', {
    categories: allCategories,
    user: req.user ? req.user : {},
  });
});
router.get('/login', (req, res) => {
  res.render('login', { user: req.user ? req.user : {} });
});
router.get('/register', (req, res) => {
  res.render('register', { user: req.user ? req.user : {} });
});
router.get('/not-found', (req, res) => {
  res.render('notFound');
});
// router.get('/*', (req, res) => {
//   res.render('notFound');
// });

module.exports = router;
