// graphql/resolvers/student.resolver.js

const { AuthenticationError, ForbiddenError } = require('apollo-server-express');
const studentController = require('../../../controller/student.Controller');  // Adjust path as needed

const resolvers = {
  Query: {
    getAllStudents: async (_, __, context) => {
      if (!context.user) throw new AuthenticationError('Authentication required');
      if (!['super-admin', 'admin', 'Teacher', 'parent'].includes(context.user.role)) {
        throw new ForbiddenError('Only super-admin, admin, and teacher can getAllStudents');
      }
      return await studentController.getAllStudents();
    },

    getStudentById: async (_, { id }, context) => {
      if (!context.user) throw new AuthenticationError('Authentication required');
      if (!['super-admin', 'admin', 'Teacher'].includes(context.user.role)) {
        throw new ForbiddenError('Only super-admin, admin, and teacher can getStudentById');
      }

      if (context.user.role === 'super-admin' && !context.user.status) {
        throw new ForbiddenError("Master do not have access to this resource");
      }
      if (context.user.role === 'Teacher' && !context.user.status) {
        throw new ForbiddenError("You do not have access to this resource");
      }
      if (context.user.role === 'parent' && !context.user.status) {
        throw new ForbiddenError("parent do not have access to this resource");
      }

      return await studentController.getStudentById(id);
    }
  },

  Mutation: {
    registerStudent: async (_, { input }, context) => {
      if (!context.user) throw new AuthenticationError('Authentication required');
      if (!['super-admin', 'admin', 'Teacher',].includes(context.user.role)) {
        throw new ForbiddenError('Only super-admin, admin, and teacher can registerStudent');
      }

      if (context.user.role === 'super-admin' && !context.user.status) {
        throw new ForbiddenError("Master do not have access to this resource");
      }
      if (context.user.role === 'Teacher' && !context.user.status) {
        throw new ForbiddenError("Teacher do not have access to this resource");
      }

      const createdByID = context.user?.id || null;
      const role = context.user.role;

      return await studentController.registerStudent(input, createdByID, role);
    },

    updateStudent: async (_, { id, input }, context) => {
      if (!context.user) throw new AuthenticationError('Authentication required');
      if (!['super-admin', 'admin', 'Teacher'].includes(context.user.role)) {
        throw new ForbiddenError('Only super-admin, admin, and teacher can updateStudent');
      }

      if (context.user.role === 'super-admin' && !context.user.status) {
        throw new ForbiddenError("Master do not have access to this resource");
      }
      if (context.user.role === 'Teacher' && !context.user.status) {
        throw new ForbiddenError("You do not have access to this resource");
      }

      return await studentController.updateStudent(id, input);
    },

    deleteStudent: async (_, { id }, context) => {
      if (!context.user) throw new AuthenticationError('Authentication required');
      if (!['super-admin', 'admin', 'Teacher'].includes(context.user.role)) {
        throw new ForbiddenError('Only super-admin, admin, and teacher can deleteStudent');
      }

      if (context.user.role === 'super-admin' && !context.user.status) {
        throw new ForbiddenError("Master do not have access to this resource");
      }
      if (context.user.role === 'Teacher' && !context.user.status) {
        throw new ForbiddenError("You do not have access to this resource");
      }
      if (context.user.role === 'parent' && !context.user.status) {
        throw new ForbiddenError("parent do not have access to this resource");
      }
      return await studentController.deleteStudent(id);
    }
  }
};

module.exports = resolvers;
