import { gql } from "apollo-server-express";

const bandsSchema = gql`
  type Member {
    id: ID!
    instrument: String
  }

  input MemberType {
    id: ID!
    instrument: String
  }

  type NewBand {
    name: String!
  }

  type Band {
    id: ID!
    name: String
    origin: String
    members: [Member]
    website: String
    genres: [Genre]
  }

  type BandsData {
    items: [Band!]
    limit: Int
    total: Int
    offset: Int
  }

  input GenreType {
    name: String
    description: String
    country: String
    year: Int
  }

  input BandData {
    id: String!
    name: String
    origin: String
    members: [MemberType]
    website: String
    genres: [GenreType]
  }

  input CreateBand {
    name: String
    origin: String
    members: [MemberType]
    website: String
    genres: [GenreType]
  }

  type Delete {
    acknowledged: Boolean
    deletedCount: Int
  }

  type Query {
    bands(limit: Int, offset: Int): BandsData
    band(id: String): Band
  }

  type Mutation {
    createBand(input: CreateBand): Band
    updateBand(input: BandData): Band
    deleteBand(id: String): Delete
  }
`;

export default bandsSchema;
