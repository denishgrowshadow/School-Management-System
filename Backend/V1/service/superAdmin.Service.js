const bcrypt = require('bcrypt');
const db = require('../Model/index.Model');
const SuperAdmin = db.SuperAdmin;

const superAdminService = {};

// Create Super Admin
superAdminService.createSuperAdminInDB = async (input, masterAdminId) => {
  try {
    const {
      firstName, lastName, gender, dateOfBirth, email,
      phone, address, city, state, country, zipCode,
      password, profilePicture, CRUD
    } = input;

    const existing = await SuperAdmin.findOne({ where: { email } });
    if (existing) throw new Error("Super Admin with this email already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newSuperAdmin = await SuperAdmin.create({
      firstName,
      lastName,
      gender,
      dateOfBirth,
      email,
      phone,
      address,
      city,
      state,
      country,
      zipCode,
      password: hashedPassword,
      profilePicture,
      role: 'super-admin',
      CRUD,
      createByID: masterAdminId,
    });

    return newSuperAdmin;
  } catch (error) {
    console.error("Create Super Admin Error:", error.message);
    throw new Error(error.message || "Failed to create Super Admin");
  }
};

// Login Super Admin
superAdminService.findSuperAdminInDB = async (email, password) => {
  try {
    const user = await SuperAdmin.findOne({ where: { email } });
    if (!user) throw new Error("User not found");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error("Invalid password");

    return user;
  } catch (error) {
    console.error("Find Super Admin Error:", error.message);
    throw new Error(error.message || "Failed to find Super Admin");
  }
};

// Get All Super Admins
superAdminService.getAllSuperAdminsFromDB = async () => {
  try {
    const superAdmins = await SuperAdmin.findAll();
    return superAdmins;
  } catch (error) {
    console.error("Get All Super Admins Error:", error.message);
    throw new Error(error.message || "Failed to fetch Super Admins");
  }
};

// Get Super Admin by ID
superAdminService.getSuperAdminByIdFromDB = async (id) => {
  try {
    const superAdmin = await SuperAdmin.findByPk(id);
    if (!superAdmin) throw new Error("Super Admin not found");
    return superAdmin;
  } catch (error) {
    console.error("Get Super Admin By ID Error:", error.message);
    throw new Error(error.message || "Failed to fetch Super Admin by ID");
  }
};

// Update Super Admin
superAdminService.updateSuperAdminInDB = async (id, input) => {
  try {
    const superAdmin = await SuperAdmin.findByPk(id);
    if (!superAdmin) throw new Error("Super Admin not found");

    if (input.password) {
      input.password = await bcrypt.hash(input.password, 10);
    }

    await superAdmin.update(input);
    return superAdmin;
  } catch (error) {
    console.error("Update Super Admin Error:", error.message);
    throw new Error(error.message || "Failed to update Super Admin");
  }
};

// Delete Super Admin
superAdminService.deleteSuperAdminInDB = async (id) => {
  try {
    const superAdmin = await SuperAdmin.findByPk(id);
    if (!superAdmin) throw new Error("Super Admin not found");

    await superAdmin.destroy();
    return { message: "Super Admin deleted successfully" };
  } catch (error) {
    console.error("Delete Super Admin Error:", error.message);
    throw new Error(error.message || "Failed to delete Super Admin");
  }
};

module.exports = superAdminService;
