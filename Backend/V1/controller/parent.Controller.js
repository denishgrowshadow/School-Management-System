// controller/parent.controller.js
const parentService = require('../service/parent.service');
const status = require('../config/StatusCode.Config');
const { generateMasterToken } = require('../service/Token.Service');

const controller = {};

controller.registerParent = async (input, createdByID, role) => {
    const result = await parentService.createParentInDB(input, createdByID, role);
    return {
        message: 'Parent registered successfully',
        statusCode: status.OK,
        data: result,
    };
};

controller.loginParent = async (email, password) => {
    const user = await parentService.findParentByEmailAndPassword(email, password);

    const tokenData = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: 'parent',
        status: user.status
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
};

controller.getAllParents = async () => {
    const result = await parentService.getAllParentsFromDB();
    return {
        message: 'Parent list fetched successfully',
        statusCode: status.OK,
        data: result
    };
};

controller.getParentById = async (id) => {
    const result = await parentService.getParentByIdFromDB(id);
    return {
        message: 'Parent fetched successfully',
        statusCode: status.OK,
        data: result
    };
};

controller.updateParent = async (id, input) => {
    const result = await parentService.updateParentInDB(id, input);
    return {
        message: 'Parent updated successfully',
        statusCode: status.OK,
        data: result
    };
};

controller.deleteParent = async (id) => {
    const result = await parentService.deleteParentInDB(id);
    return {
        message: 'Parent deleted successfully',
        statusCode: status.OK,
        data: result
    };
};

module.exports = controller;
