// schema/typeDefs.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type MasterAdmin {
    id: ID!
    name: String!
    email: String!
    role: String!
    CRUD: Boolean! # Updated from status
  }

  input mainRegisterInput {
    name: String!
    password: String!
    email: String!
    role: String
    CRUD: Boolean # Added to allow setting CRUD during registration
  }

  input mainUpdateInput {
    id: ID!
    name: String
    email: String
    password: String
    role: String
    CRUD: Boolean # Added for updates
  }

  type MasterAdminResponse {
    message: String!
    statusCode: Int!
    data: MasterAdmin!
  }

  type AuthPayload {
    message: String!
    statusCode: Int!
    data: AuthData!
  }

  type AuthData {
    masterToken: String!
    user: MasterAdmin!
  }

  type Query {
    getMasterAdmins: [MasterAdmin!]! # Added to fetch all MasterAdmins
    getMasterAdmin(id: ID!): MasterAdmin # Added to fetch a single MasterAdmin
  }

  type Mutation {
    mainAdminRegister(input: mainRegisterInput!): MasterAdminResponse!
    masterAdminLogin(email: String!, password: String!): AuthPayload!
    updateMasterAdmin(input: mainUpdateInput!): MasterAdminResponse! # Added for update
    deleteMasterAdmin(id: ID!): MasterAdminResponse! # Added for delete
  }
`;

module.exports = typeDefs;