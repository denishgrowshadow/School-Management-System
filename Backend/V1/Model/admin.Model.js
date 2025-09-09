// models/Admin.js

module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define('Admin', {
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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender: {
            type: DataTypes.ENUM('male', 'female', 'other'),
            allowNull: true,
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'admin',
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        editData: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        deletData: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        insertData: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        profilePicture: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        createdByID: {
            type: DataTypes.UUID,
            allowNull: true,
        },
    }, {
        tableName: 'admin',
        timestamps: true,
    });

    return Admin;
};
