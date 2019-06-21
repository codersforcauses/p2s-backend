[![Build Status](https://travis-ci.com/codersforcauses/p2s-backend.svg?branch=master)](https://travis-ci.com/codersforcauses/p2s-backend) &emsp;
[![Maintainability](https://api.codeclimate.com/v1/badges/4aa460872f0cf4404d2e/maintainability)](https://codeclimate.com/github/codersforcauses/p2s-backend/maintainability)

# P2S Backend

> Backend server for the p2s rugbyworks app

## About

This project uses a REST api built with [Feathers](http://feathersjs.com) and a [MongoDB](https://www.mongodb.com) database.

## Getting Started

### Prerequisites 

* [NodeJS](https://nodejs.org/)
* [Yarn](https://yarnpkg.com/en/) or [npm](https://www.npmjs.com/)
* [MongoDB](https://www.mongodb.com/download-center/community)

### Installation

1. Clone this repository
2. Navigate to the folder with `cd path/to/repo`.
3. Run `yarn` or `npm install` to install dependencies.

### Running the backend

1. Make sure MongoDB is running with `mongod`.
2. Add `ENV_KEY` as an environment variable with `export ENV_KEY='secret key here'`.
3. Run with `yarn start` or `npm start` for a production build or `yarn dev`/`npm run dev` for a development build.

## Testing

Run `yarn test` or `npm test` and all your tests in the `test/` directory will be run.

## Database structure
![Database Schema](https://cdn.discordapp.com/attachments/519088761942966272/529246506771939348/P2SSchemaERD.png)

## License

Copyright (c) 2018

Licensed under the [MIT license](LICENSE).
