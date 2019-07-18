const authentication = require('@feathersjs/authentication');
const jwt = require('@feathersjs/authentication-jwt');
const local = require('@feathersjs/authentication-local');
const { isVerified } = require('feathers-authentication-management').hooks;
const { NotAuthenticated } = require('@feathersjs/errors');
const { validateSchema } = require('./hooks/validation/validatehooks');
const { loginSchema } = require('./hooks/validation/schema/user');

module.exports = (app) => {
  const config = app.get('authentication');
  // console.log(app.services);

  // Set up authentication with the secret
  app.configure(authentication(config));
  app.configure(jwt());
  app.configure(local());
  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.service('authentication').hooks({
    before: {
      create: [
        validateSchema(loginSchema),
        authentication.hooks.authenticate(config.strategies),
        isVerified(),
      ],
      remove: [
        authentication.hooks.authenticate('jwt'),
      ],
    },
    error(context) {
      if (context.error.name === 'Error') {
        throw new NotAuthenticated('User\'s email is not yet verified.');
      }
    },
  });
};
