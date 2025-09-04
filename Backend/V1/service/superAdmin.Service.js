const bcrypt = require('bcrypt');
const db = require('../Model/index.Model');
const SuperAdmin = db.SuperAdmin;

const superAdminService = {};

superAdminService.createSuperAdminInDB = async (input, masterAdminId) => {
  const {
    firstName, lastName, gender, dateOfBirth, email,
    phone, address, city, state, country, zipCode, 
    password, profilePicture
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
    status: true,
    createByID: masterAdminId,
  });

  return newSuperAdmin;
};

superAdminService.findSuperAdminInDB = async (email, password) => {
  const user = await SuperAdmin.findOne({ where: { email } });
  if (!user) throw new Error("User not found");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Invalid password");

  return user;
};

superAdminService.getAllSuperAdminsFromDB = async () => {
  const superAdmins = await SuperAdmin.findAll();
  return superAdmins;
};

superAdminService.getSuperAdminByIdFromDB = async (id) => {
  const superAdmin = await SuperAdmin.findByPk(id);
  return superAdmin;
};

superAdminService.updateSuperAdminInDB = async (id, input) => {
  const superAdmin = await SuperAdmin.findByPk(id);
  if (!superAdmin) throw new Error("SuperAdmin not found");

  if (input.password) {
    input.password = await bcrypt.hash(input.password, 10);
  }

  await superAdmin.update(input);
  return superAdmin;
};

superAdminService.deleteSuperAdminInDB = async (id) => {
  const superAdmin = await SuperAdmin.findByPk(id);
  if (!superAdmin) throw new Error("SuperAdmin not found");

  await superAdmin.destroy();
};

module.exports = superAdminService;
