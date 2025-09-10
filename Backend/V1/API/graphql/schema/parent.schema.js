// graphql/typeDefs/parent.schema.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  enum Gender {
    male
    female
    other
  }

  type Parent {
    id: ID!
    firstName: String!
    lastName: String!
    gender: Gender
    email: String!
    phone: String
    address: String
    profilePicture: String
    CRUD: Boolean
    createdByAdminID: ID
    createdBySuperAdminID: ID
    createdByTeacherID: ID
    createdAt: String!
    updatedAt: String!
    role: String!
  }

  input RegisterParentInput {
    firstName: String!
    lastName: String!
    gender: Gender!
    email: String!
    phone: String!
    CRUD: Boolean
    address: String!
    profilePicture: String
    createdByAdminID: ID
    createdBySuperAdminID: ID
    createdByTeacherID: ID
    password: String!
  }

  input UpdateParentInput {
    firstName: String
    lastName: String
    gender: Gender
    phone: String
    address: String
    profilePicture: String
    CRUD: Boolean
  }

  type ParentResponse {
    message: String!
    statusCode: Int!
    data: Parent!
  }

  type ParentListResponse {
    message: String!
    statusCode: Int!
    data: [Parent!]!
  }

  type ParentAuthData {
    parentToken: String!
    user: Parent!
  }

  type AuthParentResponse {
    message: String!
    statusCode: Int!
    data: ParentAuthData!
  }

  type Query {
    getAllParents: ParentListResponse!
    getParentById(id: ID!): ParentResponse!
  }

  type Mutation {
    registerParent(input: RegisterParentInput!): ParentResponse!
    loginParent(email: String!, password: String!): AuthParentResponse!
    updateParent(id: ID!, input: UpdateParentInput!): ParentResponse!
    deleteParent(id: ID!): ParentResponse!
  }
`;

module.exports = typeDefs;
