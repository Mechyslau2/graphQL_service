
export default  {
  Query: {
    jwt: async(_, { email, password }, { dataSources }) => {
      const token = await dataSources.userApi.login(email, password);
      await dataSources.userApi.verifyToken(token.jwt);
      process.env.AUTH = token.jwt;
      return token;
    },
    user: (_, { id }, { dataSources }) => {
      return dataSources.userApi.getUserById(id);
    },
  },
  Mutation: {
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
  }
};
