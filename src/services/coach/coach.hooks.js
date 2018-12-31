const { authenticate } = require('@feathersjs/authentication').hooks;
const { protect } = require('@feathersjs/authentication-local').hooks;
const { usercreate, userfind, userget } = require('../../hooks/userhooks');
const permission = require('../../hooks/permission');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [permission({ roles: ['admin', 'manager'] }), usercreate()],
    update: [permission({ roles: ['coach'] })],
    patch: [permission({ roles: ['coach'] })],
    remove: [permission({ roles: ['admin', 'manager'] })],
  },

  after: {
    all: [],
    find: [userfind(), protect('password')],
    get: [userget(), protect('password')],
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
