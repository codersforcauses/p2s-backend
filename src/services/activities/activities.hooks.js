const { authenticate } = require('@feathersjs/authentication').hooks;
const permission = require('../../hooks/permission');
const { validateSchema } = require('../../hooks/validation/validatehooks');
const { activitySchema } = require('../../hooks/validation/schema/activities');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [permission({ roles: ['admin', 'manager', 'coach'] })],
    get: [permission({ roles: ['admin', 'manager', 'coach'] })],
    create: [permission({ roles: ['admin'] }), validateSchema(activitySchema)],
    update: [],
    patch: [permission({ roles: ['admin'] }), validateSchema(activitySchema)],
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
