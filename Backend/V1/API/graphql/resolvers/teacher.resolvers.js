// graphql/resolvers/teacher.resolver.js

const { AuthenticationError, ForbiddenError } = require('apollo-server-express');
const teacherController = require('../../../controller/teacher.Controller');

const resolvers = {
  Query: {
    getAllTeachers: async (_, __, context) => {
      if (!context.user) throw new AuthenticationError('Authentication required');
      if (!['super-admin', 'admin'].includes(context.user.role)) {
        throw new ForbiddenError('Only super-admin & admins can getAllTeachers teachers');
      }

      // if (context.user.role === 'admin' && !context.user.status) {
      //   throw new ForbiddenError("You do not have access to this resource");
      // }
      return await teacherController.getAllTeachers();
    },

    getTeacherById: async (_, { id }, context) => {
      if (!context.user) throw new AuthenticationError('Authentication required');
      if (!['super-admin', 'admin'].includes(context.user.role)) {
        throw new ForbiddenError('Only super-admin & admins can getTeacherById teachers');
      }


      if (context.user.role === 'super-admin' && !context.user.status) {
        throw new ForbiddenError("Master do not have access to this resource");
      }
      if (context.user.role === 'admin' && !context.user.status) {
        throw new ForbiddenError("You do not have access to this resource");
      }

      return await teacherController.getTeacherById(id);
    }
  },

  Mutation: {
    registerTeacher: async (_, { input }, context) => {
      console.log(context);

      if (!context.user) throw new AuthenticationError('Authentication required');

      if (!['super-admin', 'admin'].includes(context.user.role)) {
        throw new ForbiddenError('Only super-admin & admins can register teachers');
      }

      // ALL CRUD PERMISSION
      if (context.user.role === 'super-admin' && !context.user.status) {
        throw new ForbiddenError("Master do not have access to this resource");
      }
      if (context.user.role === 'admin' && !context.user.status) {
        throw new ForbiddenError("You do not have access to this resource");
      }

      // CRUD SPEACFIC PERMISSION
      if (context.user.role === 'admin' && !context.user.insertData) {
        throw new ForbiddenError("super-admin To CRUD Permission not have access to this resource");
      }
      const createdByID = context.user?.id || null;
      const role = context.user.role;

      return await teacherController.registerTeacher(input, createdByID, role);
    },

    loginTeacher: async (_, { email, password }) => {
      return await teacherController.loginTeacher(email, password);
    },

    updateTeacher: async (_, { id, input }, context) => {
      if (!context.user) throw new AuthenticationError('Authentication required');

      if (!['super-admin', 'admin'].includes(context.user.role)) {
        throw new ForbiddenError('Only super-admin & admins can update teachers');
      }

      if (context.user.role === 'super-admin' && !context.user.status) {
        throw new ForbiddenError("Master do not have access to this resource");
      }
      if (context.user.role === 'admin' && !context.user.status) {
        throw new ForbiddenError("You do not have access to this resource");
      }


      // CRUD  Specefic PERMISSION
      if (context.user.role === 'admin' && !context.user.editData) {
        throw new ForbiddenError("super-admin to CRUD Permission not have access to this resource");
      }

      const updatedByID = context.user?.id || null;
      return await teacherController.updateTeacher(id, input, updatedByID);
    },

    deleteTeacher: async (_, { id }, context) => {
      if (!context.user) throw new AuthenticationError('Authentication required');

      if (!['super-admin', 'admin'].includes(context.user.role)) {
        throw new ForbiddenError('Only super-admin & admins can delete teachers');
      }

      // ALL CRUD PERMISSION STATUS
      if (context.user.role === 'super-admin' && !context.user.status) {
        throw new ForbiddenError("Master do not have access to this resource");
      }
      if (context.user.role === 'admin' && !context.user.status) {
        throw new ForbiddenError("You do not have access to this resource");
      }


      // CRUD Specefic PERMISSION
      if (context.user.role === 'admin' && !context.user.deletData) {
        throw new ForbiddenError("super-admin To CRUD Permission not have access to this resource");
      }
      const deletedByID = context.user?.id || null;
      return await teacherController.deleteTeacher(id, deletedByID);
    }
  }
};

module.exports = resolvers;
