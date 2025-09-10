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

      // ALL CRUD PERMISSION STATUS
      if (context.user.role === 'super-admin' && !context.user.CRUD) {
        throw new ForbiddenError("Master do not have access to this resource");
      }
      if (context.user.role === 'admin' && !context.user.CRUD) {
        throw new ForbiddenError("super-admin do not have access to this resource");
      }
      if (context.user.role === 'Teacher' && !context.user.CRUD) {
        throw new ForbiddenError("You do not have access to this resource");
      }
      if (context.user.role === 'parent' && !context.user.CRUD) {
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

      // ALL CRUD PERMISSION STATUS
      if (context.user.role === 'super-admin' && !context.user.CRUD) {
        throw new ForbiddenError("Master do not have access to this resource");
      }
      if (context.user.role === 'admin' && !context.user.CRUD) {
        throw new ForbiddenError("super-admin do not have access to this resource");
      }
      if (context.user.role === 'Teacher' && !context.user.CRUD) {
        throw new ForbiddenError("You do not have access to this resource");
      }
      if (context.user.role === 'parent' && !context.user.CRUD) {
        throw new ForbiddenError("parent do not have access to this resource");
      }


      // CRUD SPEACFIC PERMISSION
      if (context.user.role === 'admin' && !context.user.insertData) {
        throw new ForbiddenError("super-admin To CRUD Permission not have access to this resource");
      }
      if (context.user.role === 'Teacher' && !context.user.insertData) {
        throw new ForbiddenError("Perent To CRUD Permission not have access to this resource");
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

      // ALL CRUD PERMISSION STATUS
      if (context.user.role === 'super-admin' && !context.user.CRUD) {
        throw new ForbiddenError("Master do not have access to this resource");
      }
      if (context.user.role === 'admin' && !context.user.CRUD) {
        throw new ForbiddenError("super-admin do not have access to this resource");
      }
      if (context.user.role === 'Teacher' && !context.user.CRUD) {
        throw new ForbiddenError("You do not have access to this resource");
      }
      if (context.user.role === 'parent' && !context.user.CRUD) {
        throw new ForbiddenError("parent do not have access to this resource");
      }

      // CRUD  Specefic PERMISSION
      if (context.user.role === 'admin' && !context.user.editData) {
        throw new ForbiddenError("super-admin to CRUD Permission not have access to this resource");
      }
      if (context.user.role === 'Teacher' && !context.user.editData) {
        throw new ForbiddenError("Perent To CRUD Permission not have access to this resource");
      }
      return await studentController.updateStudent(id, input);
    },

    deleteStudent: async (_, { id }, context) => {
      if (!context.user) throw new AuthenticationError('Authentication required');
      if (!['super-admin', 'admin', 'Teacher'].includes(context.user.role)) {
        throw new ForbiddenError('Only super-admin, admin, and teacher can deleteStudent');
      }

      // ALL CRUD PERMISSION STATUS
      if (context.user.role === 'super-admin' && !context.user.CRUD) {
        throw new ForbiddenError("Master do not have access to this resource");
      }
      if (context.user.role === 'admin' && !context.user.CRUD) {
        throw new ForbiddenError("super-admin do not have access to this resource");
      }
      if (context.user.role === 'Teacher' && !context.user.CRUD) {
        throw new ForbiddenError("You do not have access to this resource");
      }
      if (context.user.role === 'parent' && !context.user.CRUD) {
        throw new ForbiddenError("parent do not have access to this resource");
      }

      // CRUD Specefic PERMISSION
      if (context.user.role === 'admin' && !context.user.deletData) {
        throw new ForbiddenError("super-admin To CRUD Permission not have access to this resource");
      }
      if (context.user.role === 'Teacher' && !context.user.deletData) {
        throw new ForbiddenError("Perent To CRUD Permission not have access to this resource");
      }
      return await studentController.deleteStudent(id);
    }
  }
};

module.exports = resolvers;
