const express = require('express');
const router = express.Router();
const studentController = require('../controller/student.Controller');

// Register a new student
router.post('/register', studentController.registerStudent);

// Login a student (if required)
router.post('/login', studentController.loginStudent);

// Get All Students
router.get('/', studentController.getAllStudents);

// Get a specific student by ID
router.get('/:id', studentController.getStudentById);

// Update student details
router.put('/:id', studentController.updateStudent);

// Delete student
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
