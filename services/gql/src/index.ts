import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import { schema } from "./schemas";
import { getResolvers } from "./resolvers";
import { setupMongodb } from "./mongodb";

const port = process.env.PORT || 4000;

async function startup() {
    const collection = await setupMongodb();

    // Setup GraphQL server
    const app = express();
    app.use(cors({
      origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
    }));
    app.use('/graphql', graphqlHTTP({
      schema: schema,
      rootValue: getResolvers(collection),
      graphiql: true,
    }));
    app.listen(port);
    console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`);
}

startup();
