const express = require('express');
const router = express.Router();
const Categories = require('../Categories/Categories');

router.get('/', async (req, res) => {
  const allCategories = await Categories.find();
  res.render('index', {
    categories: allCategories,
    user: req.user ? req.user : {},
  });
});

router.get('/profile/:id', (req, res) => {
  res.render('profile', { user: req.user ? req.user : {} });
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
// router.get('/*', (req, res) => {
//   res.render('notFound');
// });

module.exports = router;
