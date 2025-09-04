// models/index.Model.js

const Sequelize = require('sequelize');
const sequelize = require('../config/db.Config');

// Import models
const defineMaster = require('./master.Model');
const defineSuper = require('./super.Model');
const defineAdmin = require('./admin.Model');
const defineTeacher = require('./teacher.Model');
const defineParent = require('./parents.Model');
const defineStudent = require('./student.Model');

// Initialize models
const Master = defineMaster(sequelize, Sequelize.DataTypes);
const SuperAdmin = defineSuper(sequelize, Sequelize.DataTypes);
const Admins = defineAdmin(sequelize, Sequelize.DataTypes);
const Teacher = defineTeacher(sequelize, Sequelize.DataTypes);
const Parent = defineParent(sequelize, Sequelize.DataTypes);
const Student = defineStudent(sequelize, Sequelize.DataTypes);

// Relationships

// SuperAdmin → Master
SuperAdmin.belongsTo(Master, {
  foreignKey: 'createByID',
  as: 'createdBy'
});

// Admin → SuperAdmin
Admins.belongsTo(SuperAdmin, {
  foreignKey: 'createdByID',
  as: 'createdBy'
});

// Teacher → Admin
Teacher.belongsTo(Admins, {
  foreignKey: 'createdByAdminID',
  as: 'createdByAdmin'
});

// Teacher → SuperAdmin
Teacher.belongsTo(SuperAdmin, {
  foreignKey: 'createdBySuperAdminID',
  as: 'createdBySuperAdmin'
});

// Parent → Teacher
Parent.belongsTo(Teacher, {
  foreignKey: 'createdByTeacherID',
  as: 'createdByTeacher'
});

// Parent → Admin
Parent.belongsTo(Admins, {
  foreignKey: 'createdByAdminID',
  as: 'createdByAdmin'
});

// Parent → SuperAdmin
Parent.belongsTo(SuperAdmin, {
  foreignKey: 'createdBySuperAdminID',
  as: 'createdBySuperAdmin'
});


// Student → Teacher 
Student.belongsTo(Teacher, {
  foreignKey: 'createdByTeacherID',
  as: 'createdByTeacher'
});

// Student → Admin
Student.belongsTo(Admins, {
  foreignKey: 'createdByAdminID',
  as: 'createdByAdmin'
});

// Student → SuperAdmin 
Student.belongsTo(SuperAdmin, {
  foreignKey: 'createdBySuperAdminID',
  as: 'createdBySuperAdmin'
});

// Student → Parent 
Student.belongsTo(Parent, {
  foreignKey: 'createdByParentID',
  as: 'createdByParent'
});

// Export
const db = {
  sequelize,
  Sequelize,
  MasterAdmin: Master,
  SuperAdmin,
  Admins,
  Teacher,
  Parent,
  Student
};

module.exports = db;
