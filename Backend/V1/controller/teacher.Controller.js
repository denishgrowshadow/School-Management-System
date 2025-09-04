// controller/teacher.controller.js
const teacherService = require('../service/teacher.Service');
const status = require('../config/StatusCode.Config');
const { generateMasterToken } = require('../service/Token.Service');

const teacherController = {};

// ✅ Register Teacher
teacherController.registerTeacher = async (input, createdByID, role) => {
  try {
    if (!createdByID || !role) {
      throw new Error("Unauthorized: Missing creator info");
    }

    const result = await teacherService.createTeacherInDB(input, createdByID, role);

    return {
      message: "Teacher registered successfully",
      statusCode: status.OK || 200,
      data: result,
    };
  } catch (error) {
    console.error("❌ Register Error:", error);
    throw new Error(error.message || "Teacher registration failed");
  }
};

// ✅ Login Teacher
teacherController.loginTeacher = async (email, password) => {
  try {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const user = await teacherService.findTeacherByEmailAndPassword(email, password);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const userData = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      status: user.status,
    };


    const teacherToken = generateMasterToken(userData);
    return {
      message: "Teacher login successful",
      statusCode: status.OK || 200,
      data: {
        teacherToken,
        user: userData,
      }
    };
  } catch (error) {
    console.error("❌ Login Error:", error);
    throw new Error(error.message || "Teacher login failed");
  }
};

// ✅ Get All Teachers
teacherController.getAllTeachers = async () => {
  try {
    const result = await teacherService.getAllTeachersFromDB();

    return {
      message: "Teacher list fetched successfully",
      statusCode: status.OK || 200,
      data: result,
    };
  } catch (error) {
    console.error("❌ Fetch Error:", error);
    throw new Error(error.message || "Unable to fetch teacher list");
  }
};

// ✅ Get Teacher By ID
teacherController.getTeacherById = async (id) => {
  try {
    const result = await teacherService.getTeacherByIdFromDB(id);

    if (!result) throw new Error("Teacher not found");

    return {
      message: "Teacher fetched successfully",
      statusCode: status.OK || 200,
      data: result,
    };
  } catch (error) {
    console.error("❌ GetByID Error:", error);
    throw new Error(error.message || "Unable to fetch teacher");
  }
};

// ✅ Update Teacher
teacherController.updateTeacher = async (id, input, updatedByID) => {
  try {
    const updated = await teacherService.updateTeacherInDB(id, input, updatedByID);

    return {
      message: "Teacher updated successfully",
      statusCode: status.OK || 200,
      data: updated,
    };
  } catch (error) {
    console.error("❌ Update Error:", error);
    throw new Error(error.message || "Teacher update failed");
  }
};

// ✅ Delete Teacher
teacherController.deleteTeacher = async (id, deletedByID) => {
  try {
    const deleted = await teacherService.deleteTeacherInDB(id, deletedByID);

    return {
      message: "Teacher deleted successfully",
      statusCode: status.OK || 200,
      data: deleted,
    };
  } catch (error) {
    console.error("❌ Delete Error:", error);
    throw new Error(error.message || "Teacher deletion failed");
  }
};

module.exports = teacherController;
