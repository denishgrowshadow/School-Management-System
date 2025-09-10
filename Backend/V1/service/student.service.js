const bcrypt = require('bcrypt');
const db = require('../Model/index.Model');
const Student = db.Student;

const service = {};

// ✅ Create Student
service.createStudentInDB = async (input, createdByID, role) => {
  try {
    const existing = await Student.findOne({ where: { email: input.email } });
    if (existing) throw new Error('Student with this email already exists');

    const hashedPassword = await bcrypt.hash(input.password, 10);

    const newStudent = await Student.create({
      ...input,
      password: hashedPassword,
      createdByAdminID: role === 'admin' ? createdByID : null,
      createdByTeacherID: role === 'Teacher' ? createdByID : null,
      createdBySuperAdminID: role === 'super-admin' ? createdByID : null,
      CRUD,
    });

    return newStudent;
  } catch (error) {
    console.error("Create Student Error:", error.message);
    throw new Error(error.message || 'Failed to create student');
  }
};

// ✅ Login Student
service.findStudentByEmailAndPassword = async (email, password) => {
  try {
    const student = await Student.findOne({ where: { email } });
    if (!student) throw new Error('Student not found');

    const isValid = await bcrypt.compare(password, student.password);
    if (!isValid) throw new Error('Invalid password');

    return student;
  } catch (error) {
    console.error("Student Login Error:", error.message);
    throw new Error(error.message || 'Failed to login student');
  }
};

// ✅ Get All Students
service.getAllStudentsFromDB = async () => {
  try {
    const students = await Student.findAll();
    return students;
  } catch (error) {
    console.error("Get All Students Error:", error.message);
    throw new Error(error.message || 'Failed to fetch students');
  }
};

// ✅ Get Student by ID
service.getStudentByIdFromDB = async (id) => {
  try {
    const student = await Student.findOne({ where: { id } });
    if (!student) throw new Error('Student not found');
    return student;
  } catch (error) {
    console.error("Get Student By ID Error:", error.message);
    throw new Error(error.message || 'Failed to fetch student');
  }
};

// ✅ Update Student
service.updateStudentInDB = async (id, input) => {
  try {
    const student = await Student.findByPk(id);
    if (!student) throw new Error('Student not found');

    const updatedStudent = await student.update(input);
    return updatedStudent;
  } catch (error) {
    console.error("Update Student Error:", error.message);
    throw new Error(error.message || 'Failed to update student');
  }
};

// ✅ Delete Student
service.deleteStudentInDB = async (id) => {
  try {
    const student = await Student.findByPk(id);
    if (!student) throw new Error('Student not found');

    await student.destroy();
    return { message: "Student deleted successfully" };
  } catch (error) {
    console.error("Delete Student Error:", error.message);
    throw new Error(error.message || 'Failed to delete student');
  }
};

module.exports = service;
