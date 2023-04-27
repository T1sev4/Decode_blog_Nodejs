const express = require('express');
const router = express.Router();
const { upload } = require('./multer');
const { createBlog, editBlog } = require('./controller');
const { isAuth } = require('../auth/middleware');
router.post('/api/blogs/newBlog', isAuth, upload.single('image'), createBlog);
router.post('/api/blogs/editBlog', isAuth, upload.single('image'), editBlog);

module.exports = router;
