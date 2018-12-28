const { authenticate } = require('@feathersjs/authentication').hooks;
const { usercreate, userfind } = require('../../hooks/userhooks');
const permission = require('../../hooks/permission');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [permission({ roles: ['admin', 'manager'] }), usercreate()],
    update: [permission({ roles: ['coach'] })],
    patch: [permission({ roles: ['coach'] })],
    remove: [permission({ roles: ['admin', 'coach'] })],
  },

  after: {
    all: [],
    find: [userfind()],
    get: [],
    create: [usercreate()],
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
