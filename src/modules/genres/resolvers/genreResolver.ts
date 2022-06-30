export default {
  Mutation: {
    createGenre: async (_, genre, { dataSources, AUTH_TOKEN }) => {
      if (!AUTH_TOKEN) return null;
      return dataSources.genreApi.createGenre(genre, AUTH_TOKEN);
    },
  },
  Query: {
    genres: (_, { limit = 5, offset = 0 }, { dataSources }) => {
      return dataSources.genreApi.getAllGenres({ limit, offset });
    },
    genre: (_, { id }, { dataSources }) => {
      return dataSources.genreApi.getGenreById(id);
    },
  },
};
