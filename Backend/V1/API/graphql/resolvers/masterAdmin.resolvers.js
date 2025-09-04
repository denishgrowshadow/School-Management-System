const masterController = require('../../../controller/masterAdmin.Controller');

const resolvers = {
    Mutation: {
        mainAdminRegister: async (_, { input }) => {
            return await masterController.registerGraphQL(input);
        },

        masterAdminLogin: async (_, { email, password }) => {
            return await masterController.loginGraphQL(email, password);
        }
    },
};

module.exports = resolvers;
