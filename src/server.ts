import "reflect-metadata";
import "./env";
import "./passport";
import path from "path";
import { GraphQLServer } from "graphql-yoga";
import { makeExecutableSchema } from "graphql-tools";
import { buildTypeDefsAndResolvers } from "type-graphql";
import { Connection, createConnection } from "typeorm";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middleware";

const PORT = process.env.PORT || 4000;

async function init() {
  const connection: Connection = await createConnection();
  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
    resolvers: [path.join(__dirname, "/api/**/*.ts")],
  });
  const schema: any = makeExecutableSchema({ typeDefs, resolvers });

  const server = new GraphQLServer({
    schema,
    context: ({ request }) => ({ request, isAuthenticated }),
  });

  server.express.use(authenticateJwt);

  server.start({ port: PORT }, () =>
    console.log(`Server running on port http://localhost:${PORT}`)
  );
}

init();
