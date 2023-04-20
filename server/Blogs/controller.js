const Blog = require('./Blog');
const createBlog = (req, res) => {
  if (req.body.title != 0) {
    new Blog({
      title: req.body.title,
      description: req.body.description,
    }).save();
    res.redirect('/');
  } else {
    res.redirect('/newBlog?error=1');
  }
};

module.exports = { createBlog };
