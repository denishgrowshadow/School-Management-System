const bcrypt = require('bcrypt');
const db = require('../Model/index.Model');
const Response = require('../response/api_Response');
const status = require('../config/StatusCode.Config');
const Master = db.MasterAdmin;

const masterService = {};

masterService.RegisterInDB = async (input) => {
    try {
        const { name, email, password, role } = input;

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
        })

        return newMasterAdmin;
    } catch (error) {
        console.error("Create Master Admin Error:", error);
        throw new Error(error.message || "Failed to create Master Admin");
    }
}

masterService.findMasterInDB = async (email, password) => {
    try {
        const user = await Master.findOne({
            where: { email }
        });

        if (!user) throw new Error("User Not Found....");

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            throw new Error("User Password Missmetch....");
        }

        return user;

    } catch (error) {
        throw error;
    }
};

module.exports = masterService;
