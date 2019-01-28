const { authenticate } = require('@feathersjs/authentication').hooks;

const { iff, isProvider } = require('feathers-hooks-common');

const { Forbidden } = require('@feathersjs/errors');

const permission = require('../../hooks/permission');

module.exports = {
  before: {
    all: [
      authenticate('jwt'),
      iff(isProvider('external'), [
        iff(context => !context.params.user.admin.is, [
          (context) => {
            const query = context.params.query || {};
            if (context.params.user.region) {
              query.region = context.params.user.region;
            } else {
              throw new Forbidden('You do not belong to that region');
            }
            context.params.query = query;
            return context;
          },
        ]),
      ]),
    ],
    find: [],
    get: [],
    create: [permission({ roles: 'admin' })],
    update: [],
    patch: [],
    remove: [permission({ roles: 'admin' })],
  },

  after: {
    all: [],
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
