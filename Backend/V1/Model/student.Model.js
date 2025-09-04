// models/Student.js

module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define('Student', {
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
            unique: true,
            allowNull: false,
        },
        gender: {
            type: DataTypes.ENUM('male', 'female', 'other'),
            allowNull: true,
        },
        dateOfBirth: {
            type: DataTypes.DATE,
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
        parentName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        parentPhone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        grade: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        section: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rollNumber: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        profilePicture: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        dateOfAdmission: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'student',
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        // Relationship to the Creator (Admin/Teacher/Super Admin/perents)
        createdByAdminID: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        createdByTeacherID: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        createdByParentID: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        createdBySuperAdminID: {
            type: DataTypes.UUID,
            allowNull: true,
        },
    }, {
        tableName: 'students',
        timestamps: true,
    });

    return Student;
};
