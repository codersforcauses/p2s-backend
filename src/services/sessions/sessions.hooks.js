const { authenticate } = require('@feathersjs/authentication').hooks;
const permission = require('../../hooks/permission');

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
