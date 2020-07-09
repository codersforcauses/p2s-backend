const { authenticate } = require('@feathersjs/authentication').hooks;
const { iff, isProvider } = require('feathers-hooks-common');
const { Forbidden } = require('@feathersjs/errors');
const { populate } = require( 'feathers-hooks-common');
const permission = require('../../hooks/permission');

const populationSchema = {
  include: [
    {
      service: 'users',
      nameAs: 'users',
      parentField: '_id',
      childField: 'region',
    },
    {
      service: 'schools',
      nameAs: 'schools',
      parentField: '_id',
      childField: 'region',
    },
  ],
};

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
    find: [permission({ roles: ['admin', 'manager'] })],
    get: [permission({ roles: ['admin', 'manager'] })],
    create: [permission({ roles: 'admin' })],
    update: [],
    patch: [permission({ roles: ['admin', 'manager'] })],
    remove: [permission({ roles: 'admin' })],
  },

  after: {
    all: [populate({ schema: populationSchema })],
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
