// graphql/resolvers/parent.resolver.js

const { AuthenticationError, ForbiddenError } = require('apollo-server-express');
const parentController = require('../../../controller/parent.Controller');
const { Teacher } = require('../../../Model/index.Model');

const resolvers = {
    Query: {
        getAllParents: async (_, __, context) => {
            if (!context.user) throw new AuthenticationError('Authentication required');
            if (!['super-admin', 'admin', 'Teacher'].includes(context.user.role)) {
                throw new ForbiddenError('Only super-admin & admins & Teacher can getAllParents');
            }
            return await parentController.getAllParents();
        },

        getParentById: async (_, { id }, context) => {
            if (!context.user) throw new AuthenticationError('Authentication required');
            if (!['super-admin', 'admin', 'Teacher'].includes(context.user.role)) {
                throw new ForbiddenError('Only super-admin & admins & Teacher can getParentById');
            }

            // CRUD Specefic PERMISSION
            if (context.user.role === 'super-admin' && !context.user.CRUD) {
                throw new ForbiddenError("Master do not have access to this resource");
            }
            if (context.user.role === 'admin' && !context.user.CRUD) {
                throw new ForbiddenError("super-admin do not have access to this resource");
            }
            if (context.user.role === 'Teacher' && !context.user.CRUD) {
                throw new ForbiddenError("teacher do not have access to this resource ");
            }
            return await parentController.getParentById(id);
        }
    },

    Mutation: {
        registerParent: async (_, { input }, context) => {
            // ALL CRUD PERMISSION STATUS
            if (context.user.role === 'super-admin' && !context.user.CRUD) {
                throw new ForbiddenError("Master do not have access to this resource");
            }
            if (context.user.role === 'admin' && !context.user.CRUD) {
                throw new ForbiddenError("super-admin do not have access to this resource");
            }
            if (context.user.role === 'Teacher' && !context.user.CRUD) {
                throw new ForbiddenError("teacher do not have access to this resource ");
            }

            // CRUD  Specefic PERMISSION
            if (context.user.role === 'admin' && !context.user.insertData) {
                throw new ForbiddenError("super-admin To CRUD Permission not have access to this resource");
            }
            if (context.user.role === 'Teacher' && !context.user.insertData) {
                throw new ForbiddenError("Prents To CRUD Permission not have access to this resource");
            }

            if (!context.user) throw new AuthenticationError('Authentication required');
            if (!['super-admin', 'admin', 'Teacher'].includes(context.user.role)) {
                throw new ForbiddenError('Only super-admin & admins & Teacher can registerParent');
            }
            const createdByID = context.user?.id || null;
            const role = context.user.role;
            return await parentController.registerParent(input, createdByID, role);
        },

        loginParent: async (_, { email, password }) => {
            return await parentController.loginParent(email, password);
        },

        updateParent: async (_, { id, input }, context) => {
            if (!context.user) throw new AuthenticationError('Authentication required');
            if (!['super-admin', 'admin', 'Teacher'].includes(context.user.role)) {
                throw new ForbiddenError('Only super-admin & admins & Teacher can updateParent');
            }

            // ALL CRUD PERMISSION STATUS
            if (context.user.role === 'super-admin' && !context.user.CRUD) {
                throw new ForbiddenError("Master do not have access to this resource");
            }
            if (context.user.role === 'admin' && !context.user.CRUD) {
                throw new ForbiddenError("super-admin do not have access to this resource");
            }
            if (context.user.role === 'Teacher' && !context.user.CRUD) {
                throw new ForbiddenError("Perent  do not have access to this resource ");
            }

            // CRUD Specefic PERMISSION
            if (context.user.role === 'admin' && !context.user.editData) {
                throw new ForbiddenError("super-admin To CRUD Permission not have access to this resource");
            }
            if (context.user.role === 'Teacher' && !context.user.editData) {
                throw new ForbiddenError("Prents To CRUD Permission not have access to this resource");
            }
            return await parentController.updateParent(id, input);
        },

        deleteParent: async (_, { id }, context) => {
            if (!context.user) throw new AuthenticationError('Authentication required');
            if (!['super-admin', 'admin', 'Teacher'].includes(context.user.role)) {
                throw new ForbiddenError('Only super-admin & admins & Teacher can deleteParent');
            }

            // ALL CRUD PERMISSION STATUS
            if (context.user.role === 'super-admin' && !context.user.CRUD) {
                throw new ForbiddenError("Master do not have access to this resource");
            }
            if (context.user.role === 'admin' && !context.user.CRUD) {
                throw new ForbiddenError("super-admin do not have access to this resource");
            }
            if (context.user.role === 'Teacher' && !context.user.CRUD) {
                throw new ForbiddenError("teacher do not have access to this resource ");
            }


            // CRUD  Specefic PERMISSION
            if (context.user.role === 'admin' && !context.user.deletData) {
                throw new ForbiddenError("super-admin To CRUD Permission not have access to this resource");
            }
            if (context.user.role === 'Teacher' && !context.user.deletData) {
                throw new ForbiddenError("Prents To CRUD Permission not have access to this resource");
            }
            return await parentController.deleteParent(id);
        }
    }
};

module.exports = resolvers;
