// Application hooks that run for every service
const { Forbidden } = require('@feathersjs/errors');
const log = require('./hooks/log');

module.exports = {
  before: {
    all: [log()],
    find: [],
    get: [],
    create: [],
    update: [
      () => {
        throw new Forbidden('Use Patch instead of Update');
      },
    ],
    patch: [],
    remove: [],
  },

  after: {
    all: [log()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [log()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
