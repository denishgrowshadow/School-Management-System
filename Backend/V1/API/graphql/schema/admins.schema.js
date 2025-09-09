const { gql } = require('apollo-server-express');

const typeDefs = gql`
  enum Gender {
    male
    female
    other
  }
  type Admin {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    phone: String
    password: String!
    role: String!
    gender: Gender!
    profilePicture: String
    status: Boolean
    createdByID: ID
    createdAt: String!
    updatedAt: String!
    editData: Boolean
    deletData: Boolean
    insertData: Boolean
  }

  input AdminRegisterInput {
    firstName: String!
    lastName: String!
    email: String!
    phone: String
    password: String!
    gender: Gender
    role: String
    status: Boolean
    editData: Boolean
    deletData: Boolean
    insertData: Boolean
    profilePicture: String
  }

  input AdminUpdateInput {
    firstName: String
    lastName: String
    email: String
    phone: String
    password: String
    gender: Gender
    role: String
    profilePicture: String
    status: Boolean
    editData: Boolean
    deletData: Boolean
    insertData: Boolean
  }

  type adminResponse {
    message: String!
    statusCode: Int!
    data: Admin!
  }

  type adminListResponse {
    message: String!
    statusCode: Int!
    data: [Admin!]!
  }

  type authAdmins {
    message: String!
    statusCode: Int!
    data: adminsData
  }

  type adminsData {
    adminsToken: String
    user: Admin
  }

  type deleteAdminResponse {
    message: String!
    statusCode: Int!
  }

  type Query {
    getAllAdmins: adminListResponse!
    getAdminByID(id: ID!): adminResponse!
  }

  type Mutation {
    AdminRegister(input: AdminRegisterInput!): adminResponse!
    AdminLogin(email: String!, password: String!): authAdmins
    updateAdmin(id: ID!, input: AdminUpdateInput!): adminResponse!
    deleteAdmin(id: ID!): deleteAdminResponse!
  }
`;

module.exports = typeDefs;
