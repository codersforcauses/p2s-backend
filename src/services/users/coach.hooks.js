const { authenticate } = require('@feathersjs/authentication').hooks;
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;
const { discardQuery, alterItems } = require('feathers-hooks-common');

const permission = require('../../hooks/permission');
const { limitQuery } = require('../../hooks/userhooks');

module.exports = {
  before: {
    all: [
      authenticate('jwt'),
      discardQuery('admin', 'manager', 'coach'),
      limitQuery('coach'),
    ],
    find: [permission({ roles: ['admin', 'manager', 'coach'] })],
    get: [permission({ roles: ['admin', 'manager', 'coach'] })],
    create: [
      permission({ roles: ['admin', 'manager'] }),
      hashPassword(),
      alterItems((rec) => {
        delete rec.admin;
        delete rec.manager;
        if (rec.coach) {
          rec.coach.is = true;
        } else {
          rec.coach = { is: true };
        }
      }),
    ],
    update: [permission({ roles: ['admin', 'manager'] }), hashPassword()],
    patch: [permission({ roles: ['admin', 'manager'] }), hashPassword()],
    remove: [permission({ roles: ['admin', 'manager'] })],
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
