const { authenticate } = require('@feathersjs/authentication').hooks;
const permission = require('../../hooks/permission');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [permission({ roles: ['coach', 'manager', 'admin'] })],
    get: [permission({ roles: ['coach', 'manager', 'admin'] })],
    create: [permission({ roles: ['coach'] })],
    update: [],
    patch: [permission({ roles: ['coach'] })],
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
