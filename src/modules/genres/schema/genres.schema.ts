import { gql } from "apollo-server-express";

const genresSchema = gql`
  type Genre {
    id: ID!
    name: String
    description: String
    country: String
    year: Int
  }

  type GenresData {
    items: [Genre!]
    total: Int
    offset: Int
    limit: Int

  }

  type Mutation {
    createGenre(
      name: String
      description: String
      year: Int
      country: String
    ): Genre
  }

  type Query {
    genres(limit: Int, offset: Int): GenresData
    genre(id: ID): Genre
  }
`;

export default genresSchema;
