import { gql } from "apollo-server-express";

const genresSchema = gql`
  input GenreData {
    id: ID!
    name: String
    description: String
    country: String
    year: Int
  }

  type Genre {
    id: ID!
    name: String
    description: String
    country: String
    year: Int
  }

  type Delete {
    acknowledged: Boolean
    deletedCount: Int
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
    updateGenre(genre: GenreData!): Genre
    deleteGenre(id: String): Delete
  }

  type Query {
    genres(limit: Int, offset: Int): GenresData
    genre(id: ID): Genre
  }
`;

export default genresSchema;
