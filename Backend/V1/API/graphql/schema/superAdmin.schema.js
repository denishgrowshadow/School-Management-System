const { gql } = require('apollo-server-express');

const typeDefs = gql`
  enum Gender {
    male
    female
    other
  }

  type SuperAdmin {
    id: ID!
    firstName: String!
    lastName: String!
    gender: Gender
    dateOfBirth: String
    email: String!
    phone: String
    address: String
    city: String
    state: String
    country: String
    zipCode: String
    profilePicture: String
    role: String
    status: Boolean
    password: String!
    createByID: ID!
    createdAt: String!
    updatedAt: String!
  }

  input CreateSuperAdminInput {
    firstName: String!
    lastName: String!
    gender: Gender
    dateOfBirth: String
    email: String!
    phone: String
    address: String
    city: String
    state: String
    status: Boolean
    country: String
    zipCode: String
    password: String!
    profilePicture: String
  }

  input UpdateSuperAdminInput {
    firstName: String
    lastName: String
    gender: Gender
    dateOfBirth: String
    email: String
    phone: String
    address: String
    city: String
    state: String
    country: String
    zipCode: String
    password: String
    profilePicture: String
    status: Boolean
  }

  type SuperAdminResponse {
    message: String!
    statusCode: Int!
    data: SuperAdmin!
  }

  type SuperAdminListResponse {
    message: String!
    statusCode: Int!
    data: [SuperAdmin!]!
  }

  type AuthData {
    message: String!
    statusCode: Int!
    data: SuperAdminAuthPayload!
  }

  type SuperAdminAuthPayload {
    superToken: String!
    user: SuperAdmin!
  }

  type Query {
    getAllSuperAdmins: SuperAdminListResponse!
    getSuperAdminById(id: ID!): SuperAdminResponse!
  }

  type Mutation {
    superAdminRegister(input: CreateSuperAdminInput!): SuperAdminResponse!
    superAdminLogin(email: String!, password: String!): AuthData!
    updateSuperAdmin(id: ID!, input: UpdateSuperAdminInput!): SuperAdminResponse!
    deleteSuperAdmin(id: ID!): SuperAdminResponse!
  }
`;

module.exports = typeDefs;
