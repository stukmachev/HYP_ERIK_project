const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

// all teachers
router.get('/', teacherController.getAllTeachers);

// teacher by id
router.get('/:id', teacherController.getTeacherById);

module.exports = router;
