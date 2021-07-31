# Property Manager App

## Solution design

ReactJS Single Page App that presents a list of properties as well as some action buttons to add new properties, edit or delete exising properties. This is achieved via GraphQL API calls to an Express service that updates a Mongo database to persist the data.

## Technology used

- NPM dependency management
- TypeScript ReactJS frontend setup with Create React App
- TypeScript NodeJS ExpressJS GraphQL backend
- MongoDB database with docker-compose to start it
- Jest unit testing

## Limitations

The current solution is limited to only a single field on each property. There is no ability to search, filter or paginate the results.

## Future Improvements

- More backend unit tests
- Additional fields on a property
- Cypress and API integration tests for all the functionality
- Creation of docker images to run the UI and GraphQL services
- More frontend unit tests
- Better frontend styling

## Running the project

See the README.md files in each of the services directories to build, run and test each service

## Available Scripts

In the project directory, you can run:

### `npm run start-infra`

Uses docker-compose to start the mongo service for data persistence

### `npm run stop-infra`

Uses docker-compose to stop the mongo service
