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
    jwt(email: String, password: String): JWT
    user(id: ID): User
  }

  type Mutation {
    register(email: String, password: String, firstName: String, lastName: String): User
  }
`;

export default usersSchema;
