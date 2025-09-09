const bcrypt = require('bcrypt');
const db = require('../Model/index.Model');
const AdminModel = db.Admins;

const adminsService = {};

// ✅ Create Admin
adminsService.createAdminInDB = async (input, superAdminId) => {
    const {
        firstName,
        lastName,
        gender,
        email,
        phone,
        status,
        password,
        profilePicture,
        role, // optional from input
        editData,
        deletData,
        insertData
    } = input;

    // Check if email already exists
    const existing = await AdminModel.findOne({ where: { email } });
    if (existing) throw new Error("Admin with this email already exists");

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    const newAdmin = await AdminModel.create({
        firstName,
        lastName,
        gender,
        email,
        phone,
        password: hashedPassword,
        profilePicture,
        role: role || 'admin',
        status,
        editData,
        deletData,
        insertData,
        createdByID: superAdminId,
    });

    return newAdmin;
};

// ✅ Login (Find Admin by email & compare password)
adminsService.findAdminsInDB = async (email, password) => {
    const user = await AdminModel.findOne({ where: { email } });
    if (!user) throw new Error("User not found");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error("Invalid password");

    return user;
};

// ✅ Get All Admins
adminsService.getAllAdminsFromDB = async () => {
    const admins = await AdminModel.findAll();
    return admins;
};

// ✅ Get Admin by ID
adminsService.getAdminByIdFromDB = async (id) => {
    const admin = await AdminModel.findByPk(id);
    if (!admin) throw new Error("Admin not found");

    return admin;
};

// ✅ Update Admin
adminsService.updateAdminInDB = async (id, input) => {
    const admin = await AdminModel.findByPk(id);
    if (!admin) throw new Error("Admin not found");

    // If password is being updated, hash it
    if (input.password) {
        input.password = await bcrypt.hash(input.password, 10);
    }

    await admin.update(input);
    return admin;
};

// ✅ Delete Admin
adminsService.deleteAdminInDB = async (id) => {
    const admin = await AdminModel.findByPk(id);
    if (!admin) throw new Error("Admin not found");

    await admin.destroy();
};

module.exports = adminsService;
