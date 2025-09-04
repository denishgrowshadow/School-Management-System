const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const MasterAdmin = sequelize.define('MasterAdmin', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'master-admin',
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    }, {
        tableName: 'master_admin',
        timestamps: false
    });

    return MasterAdmin;
};
