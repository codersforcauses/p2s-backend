const { authenticate } = require('@feathersjs/authentication').hooks;
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;
const {
  iff, discardQuery, alterItems, keepQuery, isProvider,
} = require('feathers-hooks-common');
const { Forbidden } = require('@feathersjs/errors');
const permission = require('../../hooks/permission');
const { limitQuery, isOwner } = require('../../hooks/userhooks');

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
    update: [hashPassword(), permission({ roles: ['admin', 'coach'] })],
    patch: [
      hashPassword(),
      permission({ roles: ['admin', 'coach'] }),
      iff(isProvider('external'),
        iff(!isOwner(),
          iff(context => context.prarams.users.admin.is,
            keepQuery(
              'region',
              'manager',
              'admin',
              'coach',
            )).else(
            iff(context => context.prarams.users.manager.is,
              keepQuery(
                'coach.qualifications',
              )),
          )).else( // If owner of records
          alterItems((rec) => {
            delete rec.region;
            delete rec.coach;
            delete rec.manager;
            delete rec.admin;
          }),
        )),
    ],
    remove: [permission({ roles: ['admin'] })],
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
