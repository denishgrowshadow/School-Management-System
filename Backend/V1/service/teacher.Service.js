const bcrypt = require('bcrypt');
const db = require('../Model/index.Model');
const Teacher = db.Teacher;

const teacherService = {};

// ✅ Create/Register Teacher
teacherService.createTeacherInDB = async (input, createdByID, role) => {
    try {
        const {
            firstName, lastName, gender, dateOfBirth, email,
            phone, address, subjectSpecialization, qualification,
            experience, joiningDate, profilePicture, password,
            CRUD, editData, deletData, insertData
        } = input;

        const existingTeacher = await Teacher.findOne({ where: { email } });
        if (existingTeacher) throw new Error("Teacher with this email already exists");

        let hashedPassword = null;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

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
            CRUD,
            editData,
            deletData,
            insertData,
            createdByAdminID: role === 'admin' ? createdByID : null,
            createdBySuperAdminID: role === 'super-admin' ? createdByID : null,
        });

        return newTeacher;
    } catch (error) {
        console.error("Create Teacher Error:", error.message);
        throw new Error(error.message || "Failed to create teacher");
    }
};

// ✅ Login Teacher
teacherService.findTeacherByEmailAndPassword = async (email, password) => {
    try {
        const teacher = await Teacher.findOne({ where: { email } });
        if (!teacher) throw new Error("Teacher not found");

        if (!teacher.password) throw new Error("Password not set for this teacher");

        const isValid = await bcrypt.compare(password, teacher.password);
        if (!isValid) throw new Error("Invalid password");

        return teacher;
    } catch (error) {
        console.error("Login Teacher Error:", error.message);
        throw new Error(error.message || "Failed to login teacher");
    }
};

// ✅ Get All Teachers
teacherService.getAllTeachersFromDB = async () => {
    try {
        const teachers = await Teacher.findAll();
        return teachers;
    } catch (error) {
        console.error("Get All Teachers Error:", error.message);
        throw new Error(error.message || "Failed to fetch teachers");
    }
};

// ✅ Get Teacher by ID
teacherService.getTeacherByIdFromDB = async (id) => {
    try {
        const teacher = await Teacher.findOne({ where: { id } });
        if (!teacher) throw new Error("Teacher not found");

        return teacher;
    } catch (error) {
        console.error("Get Teacher By ID Error:", error.message);
        throw new Error(error.message || "Failed to fetch teacher by ID");
    }
};

// ✅ Update Teacher
teacherService.updateTeacherInDB = async (id, input, updatedByID) => {
    try {
        const teacher = await Teacher.findOne({ where: { id } });
        if (!teacher) throw new Error("Teacher not found");

        if (input.password) {
            input.password = await bcrypt.hash(input.password, 10);
        }

        await teacher.update({
            ...input,
            // Optionally log updatedByID
        });

        return teacher;
    } catch (error) {
        console.error("Update Teacher Error:", error.message);
        throw new Error(error.message || "Failed to update teacher");
    }
};

// ✅ Delete Teacher
teacherService.deleteTeacherInDB = async (id, deletedByID) => {
    try {
        const teacher = await Teacher.findByPk(id);
        if (!teacher) throw new Error("Teacher not found");

        await teacher.destroy();

        // Optionally log deletedByID or soft delete
        return { message: "Teacher deleted successfully" };
    } catch (error) {
        console.error("Delete Teacher Error:", error.message);
        throw new Error(error.message || "Failed to delete teacher");
    }
};

module.exports = teacherService;
