// controller/student.controller.js

const studentService = require('../service/student.service');  // Adjust path as needed
const status = require('../config/StatusCode.Config');
const { generateMasterToken } = require('../service/Token.Service'); // If needed

const controller = {};

controller.registerStudent = async (input, createdByID, role) => {
  const result = await studentService.createStudentInDB(input, createdByID, role);
  return {
    message: 'Student registered successfully',
    statusCode: status.OK,
    data: result
  };
};

controller.loginStudent = async (email, password) => {
  const user = await studentService.findStudentByEmailAndPassword(email, password);

  const tokenData = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: 'student',
    status: user.status
  };

  const studentToken = generateMasterToken(tokenData);
  return {
    message: 'Student login successful',
    statusCode: status.OK,
    data: {
      studentToken,
      user: tokenData
    }
  };
};

controller.getAllStudents = async () => {
  const result = await studentService.getAllStudentsFromDB();
  return {
    message: 'Student list fetched successfully',
    statusCode: status.OK,
    data: result
  };
};

controller.getStudentById = async (id) => {
  const result = await studentService.getStudentByIdFromDB(id);
  return {
    message: 'Student fetched successfully',
    statusCode: status.OK,
    data: result
  };
};

controller.updateStudent = async (id, input) => {
  const result = await studentService.updateStudentInDB(id, input);
  return {
    message: 'Student updated successfully',
    statusCode: status.OK,
    data: result
  };
};

controller.deleteStudent = async (id) => {
  const result = await studentService.deleteStudentInDB(id);
  return {
    message: 'Student deleted successfully',
    statusCode: status.OK,
    data: result
  };
};

module.exports = controller;
