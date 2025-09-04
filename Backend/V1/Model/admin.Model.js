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






// models/Admin.js module.exports = (sequelize, DataTypes) => { const Admin = sequelize.define('Admin', { id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, }, firstName: { type: DataTypes.STRING, allowNull: false, }, lastName: { type: DataTypes.STRING, allowNull: false, }, email: { type: DataTypes.STRING, allowNull: false, unique: true, }, phone: { type: DataTypes.STRING, allowNull: true, }, password: { type: DataTypes.STRING, allowNull: false, }, gender: { type: DataTypes.ENUM('male', 'female', 'other'), allowNull: true, }, role: { type: DataTypes.STRING, defaultValue: 'admin', }, CRUD: { type: DataTypes.BOOLEAN, default: true, }, status: { type: DataTypes.BOOLEAN, defaultValue: true, }, profilePicture: { type: DataTypes.STRING, allowNull: true, }, createdByID: { type: DataTypes.UUID, allowNull: true, }, }, { tableName: 'admin', timestamps: true, }); return Admin; }; maro Aa graphql ma project create thay che Superadmin che maro Ae Tokrn ma thi Admi create thay che Aa table par toh mane CRUD : true che Aetle admin ne badha data No Aecss Male che teachers and perents no toh me Graphql mathi Token ma Moklvanu che aa CRUD False karu Aetle Admin ne Acsess nahi male Aevu impelment graphql ma karvu che