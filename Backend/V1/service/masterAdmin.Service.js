// service/masterAdmin.Service.js
const bcrypt = require('bcrypt');
const db = require('../Model/index.Model');
const Response = require('../response/api_Response');
const status = require('../config/StatusCode.Config');
const Master = db.MasterAdmin;

const masterService = {};

masterService.RegisterInDB = async (input) => {
    try {
        const { name, email, password, role, CRUD } = input;

        const existing = await Master.findOne({ where: { email } });
        if (existing) {
            throw new Error("Master Admin with this email already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newMasterAdmin = await Master.create({
            name,
            email,
            password: hashedPassword,
            role,
            CRUD: CRUD !== undefined ? CRUD : true
        });

        return newMasterAdmin;
    } catch (error) {
        console.error("Create Master Admin Error:", error);
        throw new Error(error.message || "Failed to create Master Admin");
    }
};

masterService.findMasterInDB = async (email, password) => {
    try {
        const user = await Master.findOne({
            where: { email }
        });

        if (!user) throw new Error("User Not Found....");

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            throw new Error("User Password Mismatch....");
        }

        return user;
    } catch (error) {
        throw error;
    }
};

masterService.updateMasterInDB = async (id, { name, email, password, role, CRUD }) => {
    try {
        const user = await Master.findByPk(id);
        if (!user) {
            throw new Error("Master Admin not found");
        }

        const hashedPassword = password ? await bcrypt.hash(password, 10) : user.password;

        await user.update({
            name: name || user.name,
            email: email || user.email,
            password: hashedPassword,
            role: role || user.role,
            CRUD: CRUD !== undefined ? CRUD : user.CRUD
        });

        console.log(`Master Admin '${user.name}' CRUD updated to: ${user.CRUD}`);

        return user;
    } catch (error) {
        console.error("Update Master Admin Error:", error);
        throw new Error(error.message || "Failed to update Master Admin");
    }
};

masterService.deleteMasterInDB = async (id) => {
    try {
        const user = await Master.findByPk(id);
        if (!user) {
            throw new Error("Master Admin not found");
        }

        console.log(`Master Admin '${user.name}' with CRUD '${user.CRUD}' deleted`);

        await user.destroy();
        return user;
    } catch (error) {
        console.error("Delete Master Admin Error:", error);
        throw new Error(error.message || "Failed to delete Master Admin");
    }
};

module.exports = masterService;