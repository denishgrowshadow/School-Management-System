const { AuthenticationError, ForbiddenError } = require('apollo-server-express');
const superAdminController = require('../../../controller/superAdmin.Controller');

const resolvers = {
  Query: {
    getAllSuperAdmins: async (_, __, context) => {
      if (!context.user) throw new AuthenticationError("Authentication required");
      if (context.user.role !== 'master-admin') throw new ForbiddenError("Not authorized");

      return await superAdminController.getAllSuperAdmins();
    },

    getSuperAdminById: async (_, { id }, context) => {
      if (!context.user) throw new AuthenticationError("Authentication required");
      if (context.user.role !== 'master-admin') throw new ForbiddenError("Not authorized");

      return await superAdminController.getSuperAdminById(id);
    }
  },

  Mutation: {
    superAdminRegister: async (_, { input }, context) => {
      if (!context.user) throw new AuthenticationError("Authentication required");
      if (context.user.role !== 'master-admin') throw new ForbiddenError("Only master-admins can create super admins");

      return await superAdminController.createSuperAdmin(input, context.user.id);
    },

    superAdminLogin: async (_, { email, password }) => {
      return await superAdminController.loginGraphQL(email, password);
    },

    updateSuperAdmin: async (_, { id, input }, context) => {
      if (!context.user) throw new AuthenticationError("Authentication required");
      if (context.user.role !== 'master-admin') throw new ForbiddenError("Not authorized");

      return await superAdminController.updateSuperAdmin(id, input);
    },

    deleteSuperAdmin: async (_, { id }, context) => {
      if (!context.user) throw new AuthenticationError("Authentication required");
      if (context.user.role !== 'master-admin') throw new ForbiddenError("Not authorized");

      return await superAdminController.deleteSuperAdmin(id);
    },
  }
};

module.exports = resolvers;
