
export const resolvers = {
  Query: {
    login: async(_, { email, password }, { dataSources }) => {
      const token = await dataSources.userApi.login(email, password);
       dataSources.userApi.verifyToken(token.jwt);
      return token;
    },
    register: (
      _,
      { email, password, firstName, lastName },
      { dataSources }
    ) => {
      return dataSources.userApi.register({
        email,
        password,
        firstName,
        lastName,
      });
    },
    getById: (_, { id }, { dataSources }) => {
      return dataSources.userApi.getUserById(id);
    },
  },
};
