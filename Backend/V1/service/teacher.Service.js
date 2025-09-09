const bcrypt = require('bcrypt');
const db = require('../Model/index.Model');
const Teacher = db.Teacher;

const teacherService = {};

// Create/Register Teacher
teacherService.createTeacherInDB = async (input, createdByID, role) => {
    const {
        firstName, lastName, gender, dateOfBirth, email,
        phone, address, subjectSpecialization, qualification,
        experience, joiningDate, profilePicture, password, status, editData, deletData,
        insertData } = input;

    // Check if email already exists
    const existingTeacher = await Teacher.findOne({ where: { email } });
    if (existingTeacher) {
        throw new Error("Teacher with this email already exists");
    }

    // Hash password if provided
    let hashedPassword = null;
    if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
    }

    // Create new teacher
    const newTeacher = await Teacher.create({
        firstName,
        lastName,
        gender,
        dateOfBirth,
        email,
        phone,
        address,
        subjectSpecialization,
        qualification,
        experience: experience || 0,
        joiningDate: joiningDate || new Date(),
        profilePicture,
        password: hashedPassword,
        status,
        editData,
        deletData,
        insertData,
        createdByAdminID: role === 'admin' ? createdByID : null,
        createdBySuperAdminID: role === 'super-admin' ? createdByID : null,
    });

    return newTeacher;
};

// Find Teacher by Email & Password (Login)
teacherService.findTeacherByEmailAndPassword = async (email, password) => {
    const teacher = await Teacher.findOne({ where: { email } });
    if (!teacher) {
        throw new Error("Teacher not found");
    }

    if (!teacher.password) {
        throw new Error("Password not set for this teacher");
    }

    const isValid = await bcrypt.compare(password, teacher.password);
    if (!isValid) {
        throw new Error("Invalid password");
    }

    return teacher;
};

// Get All Teachers
teacherService.getAllTeachersFromDB = async () => {
    return await Teacher.findAll();
};

// Get Teacher by ID
teacherService.getTeacherByIdFromDB = async (id) => {
    return await Teacher.findOne({ where: { id } });
};

// Update Teacher
teacherService.updateTeacherInDB = async (id, input, updatedByID) => {
    const teacher = await Teacher.findOne({ where: { id } });
    if (!teacher) {
        throw new Error("Teacher not found");
    }

    // Optionally hash password if being updated
    if (input.password) {
        input.password = await bcrypt.hash(input.password, 10);
    }

    await teacher.update({
        ...input,
        // You can track who updated here if you want
        // updatedByID
    });

    return teacher;
};

// Delete Teacher (Soft delete or hard delete depending on your design)
teacherService.deleteTeacherInDB = async (id, deletedByID) => {
    const teacher = await Teacher.findOne({ where: { id } });
    if (!teacher) {
        throw new Error("Teacher not found");
    }

    // Option 1: Hard delete
    await teacher.destroy();

    // Option 2: Soft delete - change status to inactive
    // await teacher.update({ status: false });

    return teacher;
};

module.exports = teacherService;
