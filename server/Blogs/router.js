const express = require('express');
const router = express.Router();
const { upload } = require('./multer');
const { createBlog } = require('./controller');
const { isAuth } = require('../auth/middleware');
router.post('/api/newBlog', isAuth, upload.single('image'), createBlog);

module.exports = router;
