const parentService = require('../service/parent.service');
const status = require('../config/StatusCode.Config');
const { generateMasterToken } = require('../service/Token.Service');

const controller = {};

// ✅ Register Parent
controller.registerParent = async (input, createdByID, role) => {
    try {
        const result = await parentService.createParentInDB(input, createdByID, role);
        return {
            message: 'Parent registered successfully',
            statusCode: status.OK,
            data: result,
        };
    } catch (error) {
        console.error("Register Parent Error:", error.message);
        return {
            message: error.message || 'Failed to register parent',
            statusCode: status.Bad_Request,
            data: null,
        };
    }
};

// ✅ Login Parent
controller.loginParent = async (email, password) => {
    try {
        const user = await parentService.findParentByEmailAndPassword(email, password);

        const tokenData = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: 'parent',
            CRUD: user.CRUD,
        };

        const parentToken = generateMasterToken(tokenData);

        return {
            message: 'Parent login successful',
            statusCode: status.OK,
            data: {
                parentToken,
                user: tokenData,
            }
        };
    } catch (error) {
        console.error("Login Parent Error:", error.message);
        return {
            message: error.message || 'Failed to login parent',
            statusCode: status.Unauthorized,
            data: null,
        };
    }
};

// ✅ Get All Parents
controller.getAllParents = async () => {
    try {
        const result = await parentService.getAllParentsFromDB();
        return {
            message: 'Parent list fetched successfully',
            statusCode: status.OK,
            data: result
        };
    } catch (error) {
        console.error("Get All Parents Error:", error.message);
        return {
            message: error.message || 'Failed to fetch parents',
            statusCode: status.Internal_Server,
            data: null
        };
    }
};

// ✅ Get Parent by ID
controller.getParentById = async (id) => {
    try {
        const result = await parentService.getParentByIdFromDB(id);
        return {
            message: 'Parent fetched successfully',
            statusCode: status.OK,
            data: result
        };
    } catch (error) {
        console.error("Get Parent By ID Error:", error.message);
        return {
            message: error.message || 'Failed to fetch parent',
            statusCode: status.Not_Found,
            data: null
        };
    }
};

// ✅ Update Parent
controller.updateParent = async (id, input) => {
    try {
        const result = await parentService.updateParentInDB(id, input);
        return {
            message: 'Parent updated successfully',
            statusCode: status.OK,
            data: result
        };
    } catch (error) {
        console.error("Update Parent Error:", error.message);
        return {
            message: error.message || 'Failed to update parent',
            statusCode: status.Bad_Request,
            data: null
        };
    }
};

// ✅ Delete Parent
controller.deleteParent = async (id) => {
    try {
        const result = await parentService.deleteParentInDB(id);
        return {
            message: 'Parent deleted successfully',
            statusCode: status.OK,
            data: result
        };
    } catch (error) {
        console.error("Delete Parent Error:", error.message);
        return {
            message: error.message || 'Failed to delete parent',
            statusCode: status.Bad_Request,
            data: null
        };
    }
};

module.exports = controller;
