const { authenticate } = require('@feathersjs/authentication').hooks;
const permission = require('../../hooks/permission');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [permission({ roles: ['admin', 'manager'] })],
    update: [permission({ roles: ['admin', 'manager', 'coach'] })],
    patch: [permission({ roles: ['admin', 'manager'] })],
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
