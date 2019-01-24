const { authenticate } = require('@feathersjs/authentication').hooks;
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;
const {
  iff, discardQuery, alterItems, isProvider, keepQuery,
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
      hashPassword(),
      permission({ roles: ['admin', 'manager'] }),
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
    update: [hashPassword(), permission({ roles: ['admin', 'coach'] }),
      () => {
        throw new Forbidden('Don\'t use update my dude');
      },
    ],
    patch: [
      hashPassword(),
      permission({ roles: ['admin', 'manager', 'coach'] }),
      iff(isProvider('external'),
        iff(context => !context.params.user.admin.is,
          iff(isOwner(), // Owner but not admin
            () => {
              console.log('not admin - is owner');
            },
            alterItems((rec) => {
              delete rec.region;
              delete rec.coach.is;
              delete rec.coach.feedback;
              delete rec.manager;
              delete rec.admin;
            }))).else(
          () => {
            console.log('is admin - ');
          },
          iff(isOwner(),
            () => {
              console.log('is owner');
            }).else(
            () => {
              console.log('not owner');
            },
            keepQuery(
              'region',
              'manager',
              'admin',
              'coach',
            ),
          ),
        ),
        iff(context => !context.params.user.manager.is,
          () => {
            console.log('not manager -');
          },
          iff(isOwner(),
            () => {
              console.log('is owner');
            },
            alterItems((rec) => {
              delete rec.coach;
            })).else(
            () => {
              console.log('not owner');
            },
            iff(context => !context.params.user.admin.is, // Not admin, manager or owner
              () => {
                console.log('is not admin, manager or owner');
                throw new Forbidden('You have insufficient permissions to edit this user');
              }),
          )).else(
          () => {
            console.log('is manager -');
          },
          iff(!isOwner(),
            () => {
              console.log('not owner');
            },
            keepQuery(
              'coach.qualifications',
            )).else(
            () => {
              console.log('is owner');
            },
          ),
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
