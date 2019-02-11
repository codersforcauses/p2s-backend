const { authenticate } = require('@feathersjs/authentication').hooks;
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;
const {
  iff,
  discardQuery,
  alterItems,
  isProvider,
} = require('feathers-hooks-common');
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
      hashPassword(),
      permission({ roles: ['admin', 'manager'] }),
      alterItems((rec) => {
        delete rec.admin;
        delete rec.manager;
        rec.coach = rec.coach || {};
        rec.coach.is = true;
      }),
      iff(isProvider('external'),
        iff(context => context.params.user.manager.is,
          iff(context => context.params.user.region,
            alterItems((rec, context) => {
              rec.region = context.params.user.region;
            }))
            .else(() => {
              throw new Forbidden('Manager must have a region');
            }))),
    ],
    update: [
      hashPassword(),
      permission({ roles: ['admin', 'manager'] }),
    ],
    patch: [
      hashPassword(),
      permission({ roles: ['admin', 'manager'] }),
    ],
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
    create: [
      iff(context => context.result.region,
        context => context.app.service('regions')
          .patch(context.result.region, { $push: { users: context.result._id } })
          .then(() => context)),
    ],
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
