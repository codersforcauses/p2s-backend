const { authenticate } = require('@feathersjs/authentication').hooks;
const permission = require('../../hooks/permission');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [permission({ roles: ['admin', 'manager', 'coach'] })],
    get: [permission({ roles: ['admin', 'manager', 'coach'] })],
    create: [permission({ roles: ['admin', 'manager', 'coach'] })],
    update: [],
    patch: [permission({ roles: ['admin', 'manager', 'coach'] })],
    remove: [permission({ roles: ['admin', 'manager'] })],
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
