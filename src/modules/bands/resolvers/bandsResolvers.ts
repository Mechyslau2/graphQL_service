export default {
  Mutation: {
    createBand: (_, band, { dataSources, AUTH_TOKEN }) => {
      if (!AUTH_TOKEN) return null;
      return dataSources.bandApi.createBand(band);
    },
    updateBand: (_, band, { dataSources, AUTH_TOKEN }) => {
      if (!AUTH_TOKEN) return null;
      return dataSources.bandApi.updateBand(band);
    },
    deleteBand: (_, { id }, { dataSources, AUTH_TOKEN }) => {
      if (!AUTH_TOKEN) return null;
      return dataSources.bandApi.deleteBand(id);
    },
  },
  Query: {
    bands: (_, { limit = 5, offset = 0 }, { dataSources }) => {
      return dataSources.bandApi.getAllBands({ limit, offset });
    },
    band: (_, { id }, { dataSources }) => {
      return dataSources.bandApi.getBandById(id);
    },
  },
};
