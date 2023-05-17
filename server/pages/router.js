const express = require('express');
const router = express.Router();
const Categories = require('../Categories/Categories');
const User = require('../auth/User');
const Blogs = require('../Blogs/Blog');
router.get('/', async (req, res) => {
  // category filter //
  const option = {};
  const category = await Categories.findOne({key: req.query.category});
  if(category){
    option.category = category;
  }  
  // category filter //

  // pagination //

  let page = 0;
  let limit = 3;
  if(req.query.page && req.query.page > 0){
    page = req.query.page;
  }
  let totalBlogs = await Blogs.count();


  // pagination //

  const blogs = await Blogs.find(option).limit(limit).skip(page * limit).populate('category').populate('author')
  const allCategories = await Categories.find();
  res.render('index', {
    categories: allCategories,
    user: req.user ? req.user : {},
    blogs : blogs,
    pages: Math.ceil(totalBlogs / limit)
  });
});

router.get('/profile/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  const blogs = await Blogs.find({author: req.params.id}).populate('category').populate('author')
  if (user) {
    res.render('profile', { user: user, loginUser: req.user, blogs });
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
router.get('/editBlog/:id', async (req, res) => {
  const allCategories = await Categories.find();
  const blog = await Blogs.findById(req.params.id)
  res.render('edit-blog', {
    categories: allCategories,
    user: req.user ? req.user : {},
    blog
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
router.get('/detail/:id', async (req, res) => {
  const allCategories = await Categories.find();
  const blog = await Blogs.findById(req.params.id).populate('category').populate('author')
  res.render('blog-detail', { 
    user: req.user ? req.user : {},
    categories: allCategories, 
    blog
  });
});
// router.get('/*', (req, res) => {
//   res.render('notFound');
// });

module.exports = router;
