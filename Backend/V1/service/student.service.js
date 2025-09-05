// service/student.service.js

const bcrypt = require('bcrypt');
const db = require('../Model/index.Model');  // Adjust according to your project structure
const Student = db.Student;  // Assuming you have a Student model in your database

const service = {};

// Create a new student
service.createStudentInDB = async (input, createdByID, role) => {
  // Check if a student with the same email already exists
  const existing = await Student.findOne({ where: { email: input.email } });
  if (existing) throw new Error('Student with this email already exists');

  // Hash the password
  const hashedPassword = await bcrypt.hash(input.password, 10);

  // Create a new student entry
  const newStudent = await Student.create({
    ...input,
    password: hashedPassword,
    createdByAdminID: role === 'admin' ? createdByID : null,
    createdByTeacherID: role === 'teacher' ? createdByID : null,
    createdBySuperAdminID: role === 'super-admin' ? createdByID : null,
    status: true,  // Assuming default active status for students
  });

  return newStudent;
};

// Find a student by email and password
service.findStudentByEmailAndPassword = async (email, password) => {
  const student = await Student.findOne({ where: { email } });
  if (!student) throw new Error('Student not found');

  // Compare the entered password with the stored hashed password
  const isValid = await bcrypt.compare(password, student.password);
  if (!isValid) throw new Error('Invalid password');

  return student;
};

service.getAllStudentsFromDB = async () => {
  return await Student.findAll();
};

// Fetch a student by their ID
service.getStudentByIdFromDB = async (id) => {
  const student = await Student.findOne({ where: { id } });
  if (!student) throw new Error('Student not found');
  return student;
};

// Update student details
service.updateStudentInDB = async (id, input) => {
  const student = await Student.findByPk(id);
  if (!student) throw new Error('Student not found');

  // Update student with the provided input
  return await student.update(input);
};

// Delete a student by their ID
service.deleteStudentInDB = async (id) => {
  const student = await Student.findByPk(id);
  if (!student) throw new Error('Student not found');

  await student.destroy();
  return student;
};

module.exports = service;
