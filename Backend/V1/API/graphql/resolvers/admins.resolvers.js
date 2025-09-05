const { AuthenticationError, ForbiddenError } = require('apollo-server-express');
const adminsController = require('../../../controller/admins.Controller');
const { Admins } = require('../../../Model/index.Model');

const resolvers = {
  Query: {
    getAllAdmins: async (_, __, context) => {
      if (!context.user) throw new AuthenticationError("Authentication required");
      if (context.user.role !== 'super-admin') throw new ForbiddenError("Not authorized");

      return await adminsController.getAllAdmins();
    },

    getAdminByID: async (_, { id }, context) => {
      if (!context.user) throw new AuthenticationError("Authentication required");
      if (context.user.role !== 'super-admin') throw new ForbiddenError("Not authorized");

      if (context.user.role === 'super-admin' && !context.user.status) {
        throw new ForbiddenError("Master do not have access to this resource");
      }
      return await adminsController.getAdminByID(id);
    }
  },

  Mutation: {
    AdminRegister: async (_, { input }, context) => {
      if (!context.user) throw new AuthenticationError("Authentication required");
      if (context.user.role !== 'super-admin') throw new ForbiddenError("Only super-admins can create admins");

      if (context.user.role === 'super-admin' && !context.user.status) {
        throw new ForbiddenError("Master do not have access to this resource");
      }
      const superAdminId = context.user.id;
      return await adminsController.RegisterAdmins(input, superAdminId);
    },

    AdminLogin: async (_, { email, password }) => {
      return await adminsController.AdminloginGraphQL(email, password);
    },

    updateAdmin: async (_, { id, input }, context) => {
      if (!context.user) throw new AuthenticationError("Authentication required");
      if (context.user.role !== 'super-admin') throw new ForbiddenError("Not authorized");

      if (context.user.role === 'super-admin' && !context.user.status) {
        throw new ForbiddenError("Master do not have access to this resource");
      }
      return await adminsController.updateAdmin(id, input);
    },

    deleteAdmin: async (_, { id }, context) => {
      if (!context.user) throw new AuthenticationError("Authentication required");
      if (context.user.role !== 'super-admin') throw new ForbiddenError("Not authorized");


      if (context.user.role === 'super-admin' && !context.user.status) {
        throw new ForbiddenError("Master do not have access to this resource");
      }
      return await adminsController.deleteAdmin(id);
    }
  }
};

module.exports = resolvers;
