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
            role: user.role
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
            status: user.status,
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

module.exports = masterController;
