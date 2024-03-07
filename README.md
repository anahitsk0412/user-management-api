### User Management Api

## Description

User Management Api is built on popular [Nest](https://github.com/nestjs/nest) framework.
It contains APIs for main CRUD operations for the user


## Installation

### Make sure you have docker installed. The DB (MySQL is being installed an run on docker container.)

If no Docker is installed on your machine, make sure to download and install using the 
following link: [Docker](https://docs.docker.com/engine/install/). Make sure to download the engine corresponding to your OS.

### Make sure you have node latest stable version(20.11.*) installed in your machine.

If you have no node inatlled, follow the link [Node](https://nodejs.org/en) to download and install latest stable version of node.

The app may also run on older versions of node but we recommend to use the latest stable version.

### Make sure you have yarn installed in your machine.

If yarn is not installed, use the following link to install it: [Yarn](https://yarnpkg.com/getting-started/install)


## Running the app

```bash
# Run docker
$ docker-compose up

# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod

```

## The app is integrated with Swagger that is accessible on http://localhost:3000/api once the app is  running

## Test
```bash
# unit tests
$ yarn run test

# test coverage
$ yarn run test:cov
```
