import "reflect-metadata";
import path from "path";
import { GraphQLServer } from "graphql-yoga";
import { makeExecutableSchema } from "graphql-tools";
import { buildTypeDefsAndResolvers } from "type-graphql";

const PORT = process.env.PORT || 4000;

async function init() {
  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
    resolvers: [path.join(__dirname, "/api/**/*.ts")],
  });
  const schema: any = makeExecutableSchema({ typeDefs, resolvers });

  const server = new GraphQLServer({
    schema,
  });

  server.start({ port: PORT }, () =>
    console.log(`Server running on port http://localhost:${PORT}`)
  );
}

init();
