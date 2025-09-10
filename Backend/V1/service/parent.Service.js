const bcrypt = require('bcrypt');
const db = require('../Model/index.Model');
const Parent = db.Parent;

const service = {};

// ✅ Create/Register Parent
service.createParentInDB = async (input, createdByID, role) => {
    try {
        const { CRUD } = input;

        const existing = await Parent.findOne({ where: { email: input.email } });
        if (existing) throw new Error('Parent with this email already exists');

        const hashedPassword = await bcrypt.hash(input.password, 10);

        const newParent = await Parent.create({
            ...input,
            password: hashedPassword,
            createdByAdminID: role === 'admin' ? createdByID : null,
            createdBySuperAdminID: role === 'super-admin' ? createdByID : null,
            createdByTeacherID: role === 'Teacher' ? createdByID : null,
            CRUD
        });

        return newParent;
    } catch (error) {
        console.error("Create Parent Error:", error.message);
        throw new Error(error.message || "Failed to create parent");
    }
};

// ✅ Login Parent
service.findParentByEmailAndPassword = async (email, password) => {
    try {
        const parent = await Parent.findOne({ where: { email } });
        if (!parent) throw new Error('Parent not found');

        const isValid = await bcrypt.compare(password, parent.password);
        if (!isValid) throw new Error('Invalid password');

        return parent;
    } catch (error) {
        console.error("Login Parent Error:", error.message);
        throw new Error(error.message || "Failed to login parent");
    }
};

// ✅ Get All Parents
service.getAllParentsFromDB = async () => {
    try {
        const parents = await Parent.findAll();
        return parents;
    } catch (error) {
        console.error("Get All Parents Error:", error.message);
        throw new Error(error.message || "Failed to fetch parents");
    }
};

// ✅ Get Parent by ID
service.getParentByIdFromDB = async (id) => {
    try {
        const parent = await Parent.findOne({ where: { id } });
        if (!parent) throw new Error('Parent not found');
        return parent;
    } catch (error) {
        console.error("Get Parent By ID Error:", error.message);
        throw new Error(error.message || "Failed to fetch parent by ID");
    }
};

// ✅ Update Parent
service.updateParentInDB = async (id, input) => {
    try {
        const parent = await Parent.findByPk(id);
        if (!parent) throw new Error('Parent not found');

        const updatedParent = await parent.update(input);
        return updatedParent;
    } catch (error) {
        console.error("Update Parent Error:", error.message);
        throw new Error(error.message || "Failed to update parent");
    }
};

// ✅ Delete Parent
service.deleteParentInDB = async (id) => {
    try {
        const parent = await Parent.findByPk(id);
        if (!parent) throw new Error('Parent not found');

        await parent.destroy();
        return { message: "Parent deleted successfully" };
    } catch (error) {
        console.error("Delete Parent Error:", error.message);
        throw new Error(error.message || "Failed to delete parent");
    }
};

module.exports = service;
