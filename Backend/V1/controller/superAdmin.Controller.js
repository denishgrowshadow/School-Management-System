const superAdminService = require('../service/superAdmin.Service');
const status = require('../config/StatusCode.Config');
const { generateMasterToken } = require('../service/Token.Service');

const superAdminController = {};

superAdminController.createSuperAdmin = async (input, masterAdminId) => {
  try {
    if (!masterAdminId) throw new Error("Unauthorized: MasterAdmin ID not provided");

    const newSuperAdmin = await superAdminService.createSuperAdminInDB(input, masterAdminId);

    return {
      message: "Super Admin created successfully",
      statusCode: status.OK,
      data: newSuperAdmin
    };
  } catch (error) {
    console.error("SuperAdmin Register Error:", error);
    throw new Error(error.message || "Super Admin creation failed");
  }
};

superAdminController.loginGraphQL = async (email, password) => {
  try {
    if (!email || !password) throw new Error("Email and password are required");

    const user = await superAdminService.findSuperAdminInDB(email, password);
    if (!user) throw new Error("Invalid email or password");

    const userdata = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      CRUD: user.CRUD,
    };

    const superToken = generateMasterToken(userdata);

    return {
      message: "SuperAdmin login successful",
      statusCode: status.OK,
      data: {
        superToken,
        user: userdata
      }
    };
  } catch (error) {
    console.error("SuperAdmin Login Error:", error);
    throw new Error(error.message || "Something went wrong");
  }
};

superAdminController.getAllSuperAdmins = async () => {
  try {
    const superAdmins = await superAdminService.getAllSuperAdminsFromDB();
    return {
      message: "SuperAdmins fetched successfully",
      statusCode: status.OK,
      data: superAdmins
    };
  } catch (error) {
    console.error("GetAll SuperAdmins Error:", error);
    throw new Error(error.message || "Failed to fetch SuperAdmins");
  }
};

superAdminController.getSuperAdminById = async (id) => {
  try {
    const superAdmin = await superAdminService.getSuperAdminByIdFromDB(id);
    if (!superAdmin) throw new Error("SuperAdmin not found");

    return {
      message: "SuperAdmin fetched successfully",
      statusCode: status.OK,
      data: superAdmin
    };
  } catch (error) {
    console.error("GetById SuperAdmin Error:", error);
    throw new Error(error.message || "Failed to fetch SuperAdmin");
  }
};

superAdminController.updateSuperAdmin = async (id, input) => {
  try {
    const updated = await superAdminService.updateSuperAdminInDB(id, input);
    return {
      message: "SuperAdmin updated successfully",
      statusCode: status.OK,
      data: updated
    };
  } catch (error) {
    console.error("Update SuperAdmin Error:", error);
    throw new Error(error.message || "Failed to update SuperAdmin");
  }
};

superAdminController.deleteSuperAdmin = async (id) => {
  try {
    await superAdminService.deleteSuperAdminInDB(id);
    return {
      message: "SuperAdmin deleted successfully",
      statusCode: status.OK,
      data: null
    };
  } catch (error) {
    console.error("Delete SuperAdmin Error:", error);
    throw new Error(error.message || "Failed to delete SuperAdmin");
  }
};

module.exports = superAdminController;
