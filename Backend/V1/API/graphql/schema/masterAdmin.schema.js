const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type MasterAdmin {
    id: ID!
    name: String!
    email: String!
    role: String
  }

  input mainRegisterInput {
    name: String!
    password: String!
    email: String!
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
    _empty: String
  }

  type Mutation {
    mainAdminRegister(input: mainRegisterInput!): MasterAdminResponse!
    masterAdminLogin(email: String!, password: String!): AuthPayload!
  }
`;

module.exports = typeDefs;
