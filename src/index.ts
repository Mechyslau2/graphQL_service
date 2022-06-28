import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import http from "http";
import "dotenv/config";

const PORT = process.env.PORT || 4001;

const  apolloServer = async(typeDefs, resolvers): Promise<void> => {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise<void>((resolve) =>
    httpServer.listen(PORT, resolve)
  );
  console.log(`🚀 Server is running on port: ${PORT}`);
}

apolloServer('a', 'b').catch(error => console.log(error));
