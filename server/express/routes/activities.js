const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');

// all activities
router.get('/', activityController.getActivities);

// activity by id
router.get('/:id', activityController.getActivityById);

module.exports = router;
