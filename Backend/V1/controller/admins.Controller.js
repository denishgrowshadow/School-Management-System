const adminsService = require('../service/admins.Service');
const status = require('../config/StatusCode.Config');
const { generateMasterToken } = require('../service/Token.Service');

const adminsController = {};

// ✅ REGISTER ADMIN
adminsController.RegisterAdmins = async (input, superAdminId) => {
  try {
    if (!superAdminId) throw new Error("Unauthorized: SuperAdmin ID not provided");

    const newAdmin = await adminsService.createAdminInDB(input, superAdminId);

    return {
      message: "Admin created successfully",
      statusCode: status.CREATE || 201,
      data: newAdmin
    };
  } catch (error) {
    console.error("Admin Register Error:", error);
    throw new Error(error.message || "Admin creation failed");
  }
};

// ✅ LOGIN ADMIN
adminsController.AdminloginGraphQL = async (email, password) => {
  try {
    if (!email || !password) throw new Error("Email and password are required");

    const user = await adminsService.findAdminsInDB(email, password);
    if (!user) throw new Error("Invalid email or password");

    const userdata = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      status: user.status,
      editData: user.editData,
      deletData: user.deletData,
      insertData: user.insertData,
    };

    const adminsToken = generateMasterToken(userdata);

    return {
      message: "Admin login successful",
      statusCode: status.OK,
      data: {
        adminsToken,
        user: userdata
      }
    };
  } catch (error) {
    console.error("Admin Login Error:", error);
    throw new Error(error.message || "Something went wrong during login");
  }
};

// ✅ GET ALL ADMINS
adminsController.getAllAdmins = async () => {
  try {
    const admins = await adminsService.getAllAdminsFromDB();
    return {
      message: "Admins fetched successfully",
      statusCode: status.OK,
      data: admins
    };
  } catch (error) {
    console.error("Get All Admins Error:", error);
    throw new Error(error.message || "Failed to fetch admins");
  }
};

// ✅ GET ADMIN BY ID
adminsController.getAdminByID = async (id) => {
  try {
    const admin = await adminsService.getAdminByIdFromDB(id);
    if (!admin) throw new Error("Admin not found");

    return {
      message: "Admin fetched successfully",
      statusCode: status.OK,
      data: admin
    };
  } catch (error) {
    console.error("Get Admin By ID Error:", error);
    throw new Error(error.message || "Failed to fetch admin");
  }
};

// ✅ UPDATE ADMIN
adminsController.updateAdmin = async (id, input) => {
  try {
    const updatedAdmin = await adminsService.updateAdminInDB(id, input);
    return {
      message: "Admin updated successfully",
      statusCode: status.OK,
      data: updatedAdmin
    };
  } catch (error) {
    console.error("Update Admin Error:", error);
    throw new Error(error.message || "Failed to update admin");
  }
};

// ✅ DELETE ADMIN
adminsController.deleteAdmin = async (id) => {
  try {
    await adminsService.deleteAdminInDB(id);
    return {
      message: "Admin deleted successfully",
      statusCode: status.OK,
      data: null
    };
  } catch (error) {
    console.error("Delete Admin Error:", error);
    throw new Error(error.message || "Failed to delete admin");
  }
};

module.exports = adminsController;
