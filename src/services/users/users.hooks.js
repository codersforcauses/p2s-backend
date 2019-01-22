const { authenticate } = require('@feathersjs/authentication').hooks;
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;
const { disallow } = require('feathers-hooks-common');
const { isOwner } = require('../../hooks/userhooks.js');
const permission = require('../../hooks/permission');

module.exports = {
  before: {
    all: [authenticate('jwt'), permission({ roles: 'admin' })],
    find: [],
    get: [],
    create: [disallow('external'), hashPassword()],
    update: [hashPassword()],
    patch: [hashPassword(), isOwner()],
    remove: [],
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password'),
    ],
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
