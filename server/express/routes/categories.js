const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// all categories
router.get('/', categoryController.getAllCategories);

// category by id
router.get('/:id', categoryController.getCategoryById);

module.exports = router;
