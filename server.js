import dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "apollo-server";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from "apollo-server-core";
import typeDefs from "./Gql/schemaGql.js";
import "./config/db.js";
import "./models/UserModel.js";
import "./models/QuotesModel.js";
import resolvers from "./Gql/resolvers.js";
import context from "./MiddleWare/middleWare.js";

const PORT = process.env.PORT || 4000;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  plugins: [
    process.env.GRAPHQLUI == "DEVELOPMENT"
      ? ApolloServerPluginLandingPageGraphQLPlayground()
      : ApolloServerPluginLandingPageDisabled(),
  ],
});

server.listen(PORT, console.log(`Server is on http://localhost:${PORT}`));
