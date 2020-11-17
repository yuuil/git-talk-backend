import "reflect-metadata";
import "./env";
import "./passport";
import path from "path";
import { GraphQLServer } from "graphql-yoga";
import { makeExecutableSchema } from "graphql-tools";
import { buildTypeDefsAndResolvers } from "type-graphql";
import { Connection, createConnection } from "typeorm";
import { authenticateJwt } from "./passport";
import { buildContext } from "graphql-passport";
import passport from "passport";
import session from "express-session";
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
    context: ({ request, response }) =>
      buildContext({ req: request, res: response, isAuthenticated }),
  });

  server.express.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: true,
        httpOnly: true,
        expires: "7d",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      },
    })
  );
  server.express.use(authenticateJwt);
  server.express.use(passport.initialize());
  server.express.use(passport.session());

  server.start({ port: PORT }, () =>
    console.log(`Server running on port http://localhost:${PORT}`)
  );
}

init();
