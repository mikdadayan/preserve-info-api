# Change Logger API

## Description

Change logger API for Console server

Framework: [Nest](https://github.com/nestjs/nest)

## Installation

```bash
$ npm install
```

## Running the app

### Start the container for local development

- Install Docker
- Get an `.env` file
- Build the image `docker build -t change-logger-api .`
- Verify that the image is created `docker images`
- Start the container `docker run -p3000:3000 change-logger-api`
- Now you can send request to `http://localhost:3000/` to verify that it is running

### Docker compose to spin up the api and database

`docker compose up`

### OR

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Connect Nest container to local mongodb container

To connect with the local mongodb container you need to use docker-compose.dev.yml file and update the mongodb url in app.module.ts from atlas to the local url.

- `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mongodb_database:${process.env.DB_PORT}/${process.env.DB_NAME}`
- `mongodb://mongodb_database:${process.env.DB_PORT}/${process.env.DB_NAME}`

## License

[MIT licensed](LICENSE).
