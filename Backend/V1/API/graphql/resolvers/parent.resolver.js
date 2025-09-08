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

            if (context.user.role === 'super-admin' && !context.user.status) {
                throw new ForbiddenError("Master do not have access to this resource");
            }
            if (context.user.role === 'admin' && !context.user.status) {
                throw new ForbiddenError("super-admin do not have access to this resource");
            }
            if (context.user.role === 'Teacher' && !context.user.status) {
                throw new ForbiddenError("teacher do not have access to this resource ");
            }
            return await parentController.getParentById(id);
        }
    },

    Mutation: {
        registerParent: async (_, { input }, context) => {
            if (context.user.role === 'super-admin' && !context.user.status) {
                throw new ForbiddenError("Master do not have access to this resource");
            }
            if (context.user.role === 'admin' && !context.user.status) {
                throw new ForbiddenError("super-admin do not have access to this resource");
            }
            if (context.user.role === 'Teacher' && !context.user.status) {
                throw new ForbiddenError("teacher do not have access to this resource ");
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


            if (context.user.role === 'super-admin' && !context.user.status) {
                throw new ForbiddenError("Master do not have access to this resource");
            }
            if (context.user.role === 'admin' && !context.user.status) {
                throw new ForbiddenError("super-admin do not have access to this resource");
            }
            if (context.user.role === 'Teacher' && !context.user.status) {
                throw new ForbiddenError("Perent  do not have access to this resource ");
            }
            return await parentController.updateParent(id, input);
        },

        deleteParent: async (_, { id }, context) => {
            if (!context.user) throw new AuthenticationError('Authentication required');
            if (!['super-admin', 'admin', 'Teacher'].includes(context.user.role)) {
                throw new ForbiddenError('Only super-admin & admins & Teacher can deleteParent');
            }


            if (context.user.role === 'super-admin' && !context.user.status) {
                throw new ForbiddenError("Master do not have access to this resource");
            }
            if (context.user.role === 'admin' && !context.user.status) {
                throw new ForbiddenError("super-admin do not have access to this resource");
            }
            if (context.user.role === 'Teacher' && !context.user.status) {
                throw new ForbiddenError("teacher do not have access to this resource ");
            }
            return await parentController.deleteParent(id);
        }
    }
};

module.exports = resolvers;
