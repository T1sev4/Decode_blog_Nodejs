const Blog = require('./Blog');
const createBlog = (req, res) => {
  if (
    req.file &&
    req.body.title.length > 0 &&
    req.body.category.length > 2 &&
    req.body.description.length > 0
  ) {
    new Blog({
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      image: `${req.file.destination}/${req.file.filename}`,
      author: req.user._id,
    }).save();
    res.redirect(`/profile/${req.user._id}`);
  } else {
    res.redirect('/newBlog?error=1');
  }
};

module.exports = { createBlog };
