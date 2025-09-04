// models/Parent.js

module.exports = (sequelize, DataTypes) => {
  const Parent = sequelize.define('Parent', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM('male', 'female', 'other'),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, 
    },

    // Relationship to the Creator (Admin/Teacher/Super Admin)
    createdByTeacherID: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    createdByAdminID: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    createdBySuperAdminID: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'parent',  
    },

  }, {
    tableName: 'parents',
    timestamps: true,  
  });

  return Parent;
};
