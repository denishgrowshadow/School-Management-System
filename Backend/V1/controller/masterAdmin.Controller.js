// controller/masterAdmin.Controller.js
const masterService = require('../service/masterAdmin.Service');
const { generateMasterToken } = require('../service/Token.Service');
const Response = require('../response/api_Response');
const status = require('../config/StatusCode.Config');

const masterController = {};

// REGISTER CONTROLLER
masterController.registerGraphQL = async (input) => {
    try {
        const user = await masterService.RegisterInDB(input);
        const Newdata = {
            id: user.id || user._id?.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            CRUD: user.CRUD
        };
        return {
            message: "Master Admin created successfully",
            statusCode: status.OK,
            data: Newdata
        };
    } catch (error) {
        console.error("Register Error:", error);
        throw new Error(error.message || "Master Admin Create Error");
    }
};

// LOGIN CONTROLLER
masterController.loginGraphQL = async (email, password) => {
    try {
        if (!email || !password) {
            throw new Error("Email and password are required");
        }
        const user = await masterService.findMasterInDB(email, password);

        if (!user) {
            throw new Error("Invalid email or password");
        }
        const userSafe = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            CRUD: user.CRUD
        };
        const masterToken = generateMasterToken(userSafe);
        return {
            message: "Master login successful",
            statusCode: status.OK,
            data: {
                masterToken,
                user: userSafe
            }
        };
    } catch (error) {
        console.error("Login Error:", error);
        throw new Error(error.message || "Something went wrong");
    }
};

// UPDATE CONTROLLER
masterController.updateMasterAdmin = async (input) => {
    try {
        const { id, name, email, password, role, CRUD } = input;
        const user = await masterService.updateMasterInDB(id, { name, email, password, role, CRUD });
        const updatedData = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            CRUD: user.CRUD
        };
        return {
            message: "Master Admin updated successfully",
            statusCode: status.OK,
            data: updatedData
        };
    } catch (error) {
        console.error("Update Error:", error);
        throw new Error(error.message || "Master Admin Update Error");
    }
};

// DELETE CONTROLLER
masterController.deleteMasterAdmin = async (id) => {
    try {
        const user = await masterService.deleteMasterInDB(id);
        return {
            message: `Master Admin '${user.name}' deleted successfully`,
            statusCode: status.OK,
            data: { id: user.id, name: user.name, CRUD: user.CRUD }
        };
    } catch (error) {
        console.error("Delete Error:", error);
        throw new Error(error.message || "Master Admin Delete Error");
    }
};

module.exports = masterController;