// models/Teacher.js

module.exports = (sequelize, DataTypes) => {
    const Teacher = sequelize.define('Teacher', {
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
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dateOfBirth: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        subjectSpecialization: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        qualification: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        experience: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        joiningDate: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        CRUD: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'Teacher',
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
        createdByAdminID: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        createdBySuperAdminID: {
            type: DataTypes.UUID,
            allowNull: true,
        },
    }, {
        tableName: 'teachers',
        timestamps: true,
    });

    return Teacher;
};
