const express = require('express');
const router = express.Router();

const teacherController = require('../controller/teacher.Controller');

// Register Teacher
router.post('/register', teacherController.registerTeacher);

// Login Teacher
router.post('/login', teacherController.loginTeacher);

// Get All Teachers
router.get('/', teacherController.getAllTeachers);

// Get Teacher by ID
router.get('/:id', teacherController.getTeacherById);

// Update Teacher
router.put('/:id', teacherController.updateTeacher);

// Delete Teacher
router.delete('/:id', teacherController.deleteTeacher);

module.exports = router;
