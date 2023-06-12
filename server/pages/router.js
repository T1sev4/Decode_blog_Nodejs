const express = require('express');
const router = express.Router();
const Categories = require('../Categories/Categories');
const User = require('../auth/User');
const Blogs = require('../Blogs/Blog');
const Comments = require('../Comments/Comments');
router.get('/', async (req, res) => {
  // category filter //
  const option = {};
  const category = await Categories.findOne({key: req.query.category});
  if(category){
    option.category = category._id;
    res.locals.category = req.query.category;
  }  
  // category filter //

  // pagination //

  let page = 0;
  let limit = 3;
  if(req.query.page && req.query.page > 0){
    page = req.query.page;
  }
  // pagination //
  // search //
  if(req.query.search && req.query.search.length > 0){
    option.$or = [
      {
        title: new RegExp(req.query.search, 'i')
      },
    ]
    res.locals.search = req.query.search
  }
    // search //
  let totalBlogs = await Blogs.count(option);

  const blogs = await Blogs.find(option).limit(limit).skip(page * limit).populate('category').populate('author')
  const allCategories = await Categories.find();
  let currentUser = {}
  if(req.user){
    currentUser = req.user
  }
  res.render('index', {
    categories: allCategories,
    user: req.user ? req.user : {},
    currentUser,
    blogs : blogs,
    pages: Math.ceil(totalBlogs / limit)
  });
});

router.get('/profile/:id', async (req, res) => {
  const currentUser = req.user
  const user = await User.findById(req.params.id);
  const blogs = await Blogs.find({author: req.params.id}).populate('category').populate('author')
  if (user) {
    res.render('profile', { user: user, loginUser: req.user, blogs, currentUser });
  } else {
    res.redirect('/not-found');
  }
});
router.get('/newBlog', async (req, res) => {
  const allCategories = await Categories.find();
  let currentUser = {}
  if(req.user){
    currentUser = req.user
  }
  res.render('new-blog', {
    categories: allCategories,
    user: req.user ? req.user : {},
    currentUser
  });
});
router.get('/editBlog/:id', async (req, res) => {
  const allCategories = await Categories.find();
  const blog = await Blogs.findById(req.params.id)
  let currentUser = {}
  if(req.user){
    currentUser = req.user
  }
  res.render('edit-blog', {
    categories: allCategories,
    user: req.user ? req.user : {},
    currentUser,
    blog
  });
});
router.get('/login', (req, res) => {
  res.render('login', { user: req.user ? req.user : {}, currentUser: {} });
});
router.get('/register', (req, res) => {
  res.render('register', { user: req.user ? req.user : {}, currentUser: {} });
});
router.get('/not-found', (req, res) => {
  res.render('notFound');
});
router.get('/detail/:id', async (req, res) => {
  const comments = await Comments.find({blogId: req.params.id}).populate('authorId')
  const allCategories = await Categories.find();
  const blog = await Blogs.findById(req.params.id).populate('category').populate('author')
  let currentUser = {}
  if(req.user){
    currentUser = req.user
  }
  res.render('blog-detail', { 
    user: req.user ? req.user : {},
    currentUser,
    categories: allCategories, 
    blog,
    comments
  });
});
// router.get('/*', (req, res) => {
//   res.render('notFound');
// });

module.exports = router;
