import { gql } from "apollo-server-express";

const usersSchema = gql`
  type User {
    id: ID!
    firstName: String
    secondName: String
    middleName: String
    password: String!
    email: String!
  }

  type JWT {
    jwt: String!
  }

  type Query {
    login(email: String, password: String): JWT
    register(email: String, password: String, firstName: String, lastName: String): User
    getById(id: ID): User
  }
`;

export default usersSchema;
