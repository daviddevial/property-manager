# GraphQL Service

GraphQL API service for adding, editing and deleting properties.

Requires a connection to MongoDB to persist the data.

## Environment Variables

- **PORT** The port number that the service starts on 
- **CORS_ORIGIN** CORS Origin header value for where the UI is hosted
- **MONGO_URL** Mongo connection string
- **DB_NAME** Mongo database name
- **COLLECTION_NAME** Mongo collection name

## Available Scripts

In the project directory, you can run:

### `npm run build`

Builds the service and outputs it to the `./dist` directory

### `npm start`

Runs the service assuming it has already been built in the `./dist` directory\
Open [http://localhost:4000/graphql](http://localhost:4000/graphql) to view the GraphiQL user interface in browser.

### `npm run watch`

Uses nodemon to watch for file changes, then rebuild and restart the service
