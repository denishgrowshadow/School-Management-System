const { gql } = require('apollo-server-express');

const typeDefs = gql`
  enum Gender {
    male
    female
    other
  }

  type Student {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    dateOfBirth: String
    phone: String!
    address: String!
    parentName: String!
    grade: String!
    gender: Gender
    section: String!
    rollNumber: Int
    password: String!
    status: Boolean
    profilePicture: String!
    dateOfAdmission: String!
    role: String!  
    createdByAdminID: ID
    createdByTeacherID: ID
    createdByParentID: ID
    createdBySuperAdminID: ID
    createdAt: String!
    updatedAt: String!
  }

  input RegisterStudentInput {
    firstName: String!
    lastName: String!
    email: String!
    gender: Gender   
    dateOfBirth: String!
    phone: String
    address: String
    parentName: String
    grade: String!
    section: String!
    rollNumber: Int
    password: String!
    status: Boolean
    profilePicture: String
    dateOfAdmission: String
    role: String
    createdByAdminID: ID
    createdByTeacherID: ID
    createdByParentID: ID
    createdBySuperAdminID: ID
  }

  input UpdateStudentInput {
    firstName: String
    lastName: String
    email: String
    gender: Gender
    dateOfBirth: String
    phone: String
    address: String
    parentName: String
    password: String!
    grade: String
    section: String
    rollNumber: Int
    status: Boolean
    profilePicture: String
    dateOfAdmission: String
    role: String
    createdByAdminID: ID
    createdByTeacherID: ID
    createdByParentID: ID
    createdBySuperAdminID: ID
  }

  type StudentResponse {
    message: String!
    statusCode: Int!
    data: Student!
  }

  type StudentListResponse {
    message: String!
    statusCode: Int!
    data: [Student!]!
  }

  type Query {
    getAllStudents: StudentListResponse!
    getStudentById(id: ID!): StudentResponse!
  }

  type Mutation {
    registerStudent(input: RegisterStudentInput!): StudentResponse!
    updateStudent(id: ID!, input: UpdateStudentInput!): StudentResponse!
    deleteStudent(id: ID!): StudentResponse!
  }
`;

module.exports = typeDefs;
