const bcrypt = require('bcrypt');
const db = require('../Model/index.Model');
const AdminModel = db.Admins;

const adminsService = {};

// ✅ Create Admin
adminsService.createAdminInDB = async (input, superAdminId) => {
    try {
        const {
            firstName,
            lastName,
            gender,
            email,
            phone,
            CRUD,
            password,
            profilePicture,
            role,
            editData,
            deletData,
            insertData
        } = input;

        const existing = await AdminModel.findOne({ where: { email } });
        if (existing) throw new Error("Admin with this email already exists");

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = await AdminModel.create({
            firstName,
            lastName,
            gender,
            email,
            phone,
            password: hashedPassword,
            profilePicture,
            role: role || 'admin',
            CRUD,
            editData,
            deletData,
            insertData,
            createdByID: superAdminId,
        });

        return newAdmin;
    } catch (error) {
        console.error("Create Admin Error:", error.message);
        throw new Error(error.message || "Failed to create Admin");
    }
};

// ✅ Login Admin
adminsService.findAdminsInDB = async (email, password) => {
    try {
        const user = await AdminModel.findOne({ where: { email } });
        if (!user) throw new Error("User not found");

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new Error("Invalid password");

        return user;
    } catch (error) {
        console.error("Admin Login Error:", error.message);
        throw new Error(error.message || "Failed to login");
    }
};

// ✅ Get All Admins
adminsService.getAllAdminsFromDB = async () => {
    try {
        const admins = await AdminModel.findAll();
        return admins;
    } catch (error) {
        console.error("Get All Admins Error:", error.message);
        throw new Error(error.message || "Failed to get admins");
    }
};

// ✅ Get Admin by ID
adminsService.getAdminByIdFromDB = async (id) => {
    try {
        const admin = await AdminModel.findByPk(id);
        if (!admin) throw new Error("Admin not found");

        return admin;
    } catch (error) {
        console.error("Get Admin By ID Error:", error.message);
        throw new Error(error.message || "Failed to get admin by ID");
    }
};

// ✅ Update Admin
adminsService.updateAdminInDB = async (id, input) => {
    try {
        const admin = await AdminModel.findByPk(id);
        if (!admin) throw new Error("Admin not found");

        if (input.password) {
            input.password = await bcrypt.hash(input.password, 10);
        }

        await admin.update(input);
        return admin;
    } catch (error) {
        console.error("Update Admin Error:", error.message);
        throw new Error(error.message || "Failed to update admin");
    }
};

// ✅ Delete Admin
adminsService.deleteAdminInDB = async (id) => {
    try {
        const admin = await AdminModel.findByPk(id);
        if (!admin) throw new Error("Admin not found");

        await admin.destroy();
        return { message: "Admin deleted successfully" };
    } catch (error) {
        console.error("Delete Admin Error:", error.message);
        throw new Error(error.message || "Failed to delete admin");
    }
};

module.exports = adminsService;
