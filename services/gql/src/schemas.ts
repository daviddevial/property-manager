import { buildSchema } from "graphql";

// Schema describing the various endpoints and associated data types available
export const schema = buildSchema(`
    input InputProperty {
        id: String!
        name: String!
    }

    type Property {
        id: String!
        name: String!
    }

    type Query {
        getProperties: [Property]
    }

    type Mutation {
        addProperty(property: InputProperty!): Boolean
        editProperty(property: InputProperty!): Boolean
        deleteProperty(property: InputProperty!): Boolean
    }
`);
