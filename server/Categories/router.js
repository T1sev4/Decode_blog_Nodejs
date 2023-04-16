const express = require('express');
const router = express.Router();
const Categories = require('./Categories');
const writeDataCategories = require('./seed');
const { getAllCategories } = require('./controller');
router.get('/api/categories', getAllCategories);

writeDataCategories();

module.exports = router;
