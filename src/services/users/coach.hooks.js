const { authenticate } = require('@feathersjs/authentication').hooks;
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;
const { iff, discardQuery, alterItems } = require('feathers-hooks-common');
const { Forbidden } = require('@feathersjs/errors');

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
        rec.coach = rec.coach || {};
        rec.coach.is = true;
      }),
      iff(context => context.params.user.manager.is,
        iff(context => context.params.user.region,
          alterItems((rec, context) => {
            rec.region = context.params.user.region;
          }))
          .else(() => {
            throw new Forbidden('Manager must have a region');
          })),
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
