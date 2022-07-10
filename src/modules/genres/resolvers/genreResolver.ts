export default {
  Mutation: {
    createGenre: (_, genre, { dataSources, AUTH_TOKEN }) => {
      if (!AUTH_TOKEN) return null;
      return dataSources.genreApi.createGenre(genre);
    },
    updateGenre: (_, { genre }, { dataSources, AUTH_TOKEN }) => {
      if (!AUTH_TOKEN) return null;
      const { id } = genre;

      return dataSources.genreApi.updateGenre(id, genre);
    },
    deleteGenre: (_, { id }, { dataSources, AUTH_TOKEN }) => {
      if (!AUTH_TOKEN) return null;
      return dataSources.genreApi.deleteGenre(id);
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
