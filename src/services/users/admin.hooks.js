const { authenticate } = require('@feathersjs/authentication').hooks;
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;
const { discardQuery } = require('feathers-hooks-common');

const permission = require('../../hooks/permission');

module.exports = {
  before: {
    all: [
      authenticate('jwt'),
      permission({ roles: 'admin' }),
      discardQuery('manager', 'coach', 'admin'),
      (context) => {
        const { query } = context.params;
        query.admin = { is: true };
        context.params.query = query;
        return context;
      },
    ],
    find: [],
    get: [],
    create: [hashPassword()],
    update: [hashPassword()],
    patch: [hashPassword()],
    remove: [],
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password'),
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
