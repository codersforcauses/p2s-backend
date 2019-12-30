const { authenticate } = require('@feathersjs/authentication').hooks;
const permission = require('../../hooks/permission');
const { validateSchema } = require('../../hooks/validation/validatehooks');
const { matrixSchema } = require('../../hooks/validation/schema/matrix');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [permission({ roles: ['admin', 'manager', 'coach'] })],
    get: [permission({ roles: ['admin', 'manager', 'coach'] })],
    create: [permission({ roles: ['admin'] }), validateSchema(matrixSchema)],
    update: [],
    patch: [permission({ roles: ['admin'] }), validateSchema(matrixSchema)],
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
