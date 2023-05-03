const { log } = require('console');
const Blog = require('./Blog');
const fs = require('fs');
const path = require('path');
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
    req.file &&
    req.body.title.length > 0 &&
    req.body.category.length > 2 &&
    req.body.description.length > 0
  ){
    const blog = await Blog.findById(req.body.id);
    fs.unlinkSync(path.join(__dirname + '../../../public' + blog.image))

    await Blog.findByIdAndUpdate( req.body.id,
    {
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      image: `/image/blogs/${req.file.filename}`,
      author: req.user._id,
    });
    res.redirect('/');
  }else{
    res.redirect(`/editBlog/${req.body.id}?error=1`);
  }
}

const deleteBlog =  async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if(blog){
    fs.unlinkSync(path.join(__dirname + '../../../public' + blog.image))
    await Blog.deleteOne({_id: req.params.id})
    res.status(200).send('ok')
  }else{
    res.status(404).send('Not found')
  }
}

module.exports = { createBlog, editBlog, deleteBlog };
