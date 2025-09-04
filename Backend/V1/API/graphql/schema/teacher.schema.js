const { gql } = require('apollo-server-express');

const typeDefs = gql`
  enum Gender {
    male
    female
    other
  }

  type Teacher {
    id: ID!
    firstName: String!
    lastName: String!
    gender: Gender
    email: String!
    dateOfBirth: String
    phone: String
    address: String
    subjectSpecialization: String!
    qualification: String!
    experience: Int
    joiningDate: String!
    status: Boolean
    profilePicture: String
    createdByAdminID: ID
    createdBySuperAdminID: ID
    createdAt: String!
    updatedAt: String!
    role: String!  
  }

  input RegisterTeacherInput {
    firstName: String!
    lastName: String!
    gender: Gender!
    email: String!
    phone: String!
    address: String!
    dateOfBirth: String!
    subjectSpecialization: String!
    qualification: String!
    experience: Int
    joiningDate: String
    profilePicture: String
    createdByAdminID: ID
    status: Boolean
    createdBySuperAdminID: ID
    password: String!
  }

  input UpdateTeacherInput {
    firstName: String
    lastName: String
    gender: Gender
    phone: String
    address: String
    subjectSpecialization: String
    qualification: String
    experience: Int
    joiningDate: String
    status: Boolean
    profilePicture: String
  }

  type TeacherResponse {
    message: String!
    statusCode: Int!
    data: Teacher!
  }

  type TeacherListResponse {
    message: String!
    statusCode: Int!
    data: [Teacher!]!
  }

  type TeacherAuthData {
    teacherToken: String!  
    user: Teacher!
  }

  type AuthTeacherResponse {
    message: String!
    statusCode: Int!
    data: TeacherAuthData!
  }

  type Query {
    getAllTeachers: TeacherListResponse!
    getTeacherById(id: ID!): TeacherResponse!
  }

  type Mutation {
    registerTeacher(input: RegisterTeacherInput!): TeacherResponse!
    loginTeacher(email: String!, password: String!): AuthTeacherResponse!
    updateTeacher(id: ID!, input: UpdateTeacherInput!): TeacherResponse!
    deleteTeacher(id: ID!): TeacherResponse!
  }
`;

module.exports = typeDefs;
