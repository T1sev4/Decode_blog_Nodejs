const express = require('express');
const router = express.Router();
const { upload } = require('./multer');
const { createBlog, editBlog, deleteBlog } = require('./controller');
const { isAuth } = require('../auth/middleware');
router.post('/api/blogs/newBlog', isAuth, upload.single('image'), createBlog);
router.post('/api/blogs/editBlog', isAuth, upload.single('image'), editBlog);
router.delete('/api/blogs/:id', isAuth, deleteBlog);

module.exports = router;
