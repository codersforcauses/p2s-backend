const authentication = require('@feathersjs/authentication');
const jwt = require('@feathersjs/authentication-jwt');
const local = require('@feathersjs/authentication-local');
const { iff } = require('feathers-hooks-common');
const { NotFound, NotAuthenticated } = require('@feathersjs/errors');
const { userService } = require('./services/users/users.hooks');


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
        iff(({ params }) => userService
          .find(params.user.email)
          .then(user => user.isVerified)
          .catch(err => new NotFound(err, 'User Not Found')),
        authentication.hooks.authenticate(config.strategies))
          .else(new NotAuthenticated('User Not Verified')),
      ],
      remove: [
        authentication.hooks.authenticate('jwt'),
      ],
    },
  });
};
