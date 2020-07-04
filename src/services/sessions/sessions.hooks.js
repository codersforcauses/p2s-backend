const { authenticate } = require('@feathersjs/authentication').hooks;
const { populate } = require( 'feathers-hooks-common');

const permission = require('../../hooks/permission');

const populationSchema = {
  include: [
    {
      service: 'feedback',
      nameAs: 'feedback',
      parentField: '_id',
      childField: 'session',
    },
    {
      service: 'reports',
      nameAs: 'reports',
      parentField: '_id',
      childField: 'session',
    },
  ],
};

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [permission({ roles: ['admin', 'manager'] })],
    get: [permission({ roles: ['admin', 'manager'] })],
    create: [permission({ roles: ['admin'] })],
    update: [],
    patch: [permission({ roles: ['admin', 'manager'] })],
    remove: [permission({ roles: ['admin'] })],
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
