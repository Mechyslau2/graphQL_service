import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import http from "http";
import { typesDefinitions } from "./schema.js";
import { resolvers } from "./app.resolvers.js";
import { services } from "./microServices.js";
import "dotenv/config";

const PORT = process.env.PORT || 4000;

const apolloServer = async (typeDefs, resolvers): Promise<void> => {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    dataSources: () => services,
    context: ({ req }) => ({
      AUTH_TOKEN: req.headers.authorization || process.env.AUTH,
    }),
  });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );
  console.log(`🚀 Server is running on port: ${PORT}`);
};

apolloServer(typesDefinitions, resolvers).catch((error) => console.log(error));
