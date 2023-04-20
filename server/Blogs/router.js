const express = require('express');
const router = express.Router();
const { createBlog } = require('./controller');
router.post('/api/newBlog', createBlog);

module.exports = router;
