const { authenticate } = require('@feathersjs/authentication').hooks;
const { protect } = require('@feathersjs/authentication-local').hooks;
const { usercreate, userfind, userget } = require('../../hooks/userhooks');
const permission = require('../../hooks/permission');

module.exports = {
  before: {
    all: [authenticate('jwt'), permission({ roles: ['admin'] })],
    find: [],
    get: [],
    create: [usercreate()],
    update: [],
    patch: [],
    remove: [],
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
