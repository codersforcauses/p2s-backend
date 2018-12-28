const { authenticate } = require('@feathersjs/authentication').hooks;
const { usercreate, userfind, userget } = require('../../hooks/userhooks');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [usercreate()],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [userfind()],
    get: [userget()],
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
