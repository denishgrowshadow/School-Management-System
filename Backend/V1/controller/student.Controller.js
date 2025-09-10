const studentService = require('../service/student.service');
const status = require('../config/StatusCode.Config');
const { generateMasterToken } = require('../service/Token.Service');

const controller = {};

// ✅ Register Student
controller.registerStudent = async (input, createdByID, role) => {
  try {
    const result = await studentService.createStudentInDB(input, createdByID, role);
    return {
      message: 'Student registered successfully',
      statusCode: status.OK,
      data: result
    };
  } catch (error) {
    console.error("Register Student Error:", error.message);
    return {
      message: error.message || 'Failed to register student',
      statusCode: status.Bad_Request,
      data: null
    };
  }
};

// ✅ Login Student
controller.loginStudent = async (email, password) => {
  try {
    const user = await studentService.findStudentByEmailAndPassword(email, password);

    const tokenData = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: 'student',
      CRUD: user.CRUD
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
  } catch (error) {
    console.error("Login Student Error:", error.message);
    return {
      message: error.message || 'Failed to login student',
      statusCode: status.Unauthorized,
      data: null
    };
  }
};

// ✅ Get All Students
controller.getAllStudents = async () => {
  try {
    const result = await studentService.getAllStudentsFromDB();
    return {
      message: 'Student list fetched successfully',
      statusCode: status.OK,
      data: result
    };
  } catch (error) {
    console.error("Get All Students Error:", error.message);
    return {
      message: error.message || 'Failed to fetch students',
      statusCode: status.Internal_Server,
      data: null
    };
  }
};

// ✅ Get Student by ID
controller.getStudentById = async (id) => {
  try {
    const result = await studentService.getStudentByIdFromDB(id);
    return {
      message: 'Student fetched successfully',
      statusCode: status.OK,
      data: result
    };
  } catch (error) {
    console.error("Get Student By ID Error:", error.message);
    return {
      message: error.message || 'Failed to fetch student',
      statusCode: status.Not_Found,
      data: null
    };
  }
};

// ✅ Update Student
controller.updateStudent = async (id, input) => {
  try {
    const result = await studentService.updateStudentInDB(id, input);
    return {
      message: 'Student updated successfully',
      statusCode: status.OK,
      data: result
    };
  } catch (error) {
    console.error("Update Student Error:", error.message);
    return {
      message: error.message || 'Failed to update student',
      statusCode: status.Bad_Request,
      data: null
    };
  }
};

// ✅ Delete Student
controller.deleteStudent = async (id) => {
  try {
    const result = await studentService.deleteStudentInDB(id);
    return {
      message: 'Student deleted successfully',
      statusCode: status.OK,
      data: result
    };
  } catch (error) {
    console.error("Delete Student Error:", error.message);
    return {
      message: error.message || 'Failed to delete student',
      statusCode: status.Bad_Request,
      data: null
    };
  }
};

module.exports = controller;
