const Blog = require('./Blog');
const createBlog = async (req, res) => {
  if (
    req.file &&
    req.body.title.length > 0 &&
    req.body.category.length > 2 &&
    req.body.description.length > 0
  ) {
    await new Blog({
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      image: `/image/blogs/${req.file.filename}`,
      author: req.user._id,
    }).save();
    res.redirect(`/profile/${req.user._id}`);
  } else {
    res.redirect('/newBlog?error=1');
  }
};

const editBlog = async (req, res) => {
  if(
    req.body.title.length > 0 &&
    req.body.category.length > 2 &&
    req.body.description.length > 0
  ){
    await Blog.updateOne({
      _id: req.body.id
    },
    {
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
    });
    res.redirect('/');
  }else{
    res.redirect(`/editBlog/${req.body.id}?error=1`)
  }
}

module.exports = { createBlog, editBlog };
