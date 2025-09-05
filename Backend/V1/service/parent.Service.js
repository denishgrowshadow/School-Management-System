// service/parent.service.js

const bcrypt = require('bcrypt');
const db = require('../Model/index.Model');
const Parent = db.Parent;

const service = {};

service.createParentInDB = async (input, createdByID, role) => {
    const { status } = input;

    const existing = await Parent.findOne({ where: { email: input.email } });
    if (existing) throw new Error('Parent with this email already exists');

    const hashedPassword = await bcrypt.hash(input.password, 10);

    const newParent = await Parent.create({
        ...input,
        password: hashedPassword,
        createdByAdminID: role === 'admin' ? createdByID : null,
        createdBySuperAdminID: role === 'super-admin' ? createdByID : null,
        createdByTeacherID: role === 'teacher' ? createdByID : null,
        status
    });

    return newParent;
};

service.findParentByEmailAndPassword = async (email, password) => {
    const parent = await Parent.findOne({ where: { email } });
    if (!parent) throw new Error('Parent not found');

    const isValid = await bcrypt.compare(password, parent.password);
    if (!isValid) throw new Error('Invalid password');

    return parent;
};

service.getAllParentsFromDB = async () => {
    return await Parent.findAll();
};

service.getParentByIdFromDB = async (id) => {
    return await Parent.findOne({ where: { id } });
};

service.updateParentInDB = async (id, input) => {
    const parent = await Parent.findByPk(id);
    if (!parent) throw new Error('Parent not found');

    return await parent.update(input);
};

service.deleteParentInDB = async (id) => {
    const parent = await Parent.findByPk(id);
    if (!parent) throw new Error('Parent not found');

    await parent.destroy();
    return parent;
};

module.exports = service;
``
