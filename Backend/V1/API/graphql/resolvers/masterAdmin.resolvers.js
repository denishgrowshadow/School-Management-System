// resolvers/index.js
const masterController = require('../../../controller/masterAdmin.Controller');

const resolvers = {
    Mutation: {
        mainAdminRegister: async (_, { input }) => {
            return await masterController.registerGraphQL(input);
        },

        masterAdminLogin: async (_, { email, password }) => {
            return await masterController.loginGraphQL(email, password);
        },

        updateMasterAdmin: async (_, { input }) => {
            return await masterController.updateMasterAdmin(input);
        },

        deleteMasterAdmin: async (_, { id }) => {
            return await masterController.deleteMasterAdmin(id);
        }
    },
};

module.exports = resolvers;