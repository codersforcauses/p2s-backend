const { authenticate } = require('@feathersjs/authentication').hooks;
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;
const {
  iff,
  discardQuery,
  alterItems,
  isProvider,
  keep,
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
    update: [hashPassword(), permission({ roles: ['admin', 'coach'] }),
      () => {
        throw new Forbidden('Use patch instead of update.');
      },
    ],
    patch: [
      hashPassword(),
      permission({ roles: ['admin', 'manager', 'coach'] }),
      iff(isProvider('external'),
        iff(isOwner(),
          iff(context => !context.params.user.admin.is,
            iff(context => !context.params.user.manager.is,
              alterItems((rec) => { // Issues with postman json formatting
                delete rec.region;
                rec.coach = rec.coach || {};
                delete rec.coach.is;
                delete rec.coach;
                rec.manager = rec.manager || {};
                delete rec.manager.is;
                delete rec.manager;
                rec.admin = rec.admin || {};
                delete rec.admin.is;
                delete rec.admin;
                console.log(rec);
              })).else( // Is Manager
              alterItems((rec) => {
                delete rec.region;
                rec.coach = rec.coach || {};
                delete rec.coach.is;
                delete rec.coach.feedback;
                delete rec.coach;
                rec.manager = rec.manager || {};
                delete rec.manager.is;
                delete rec.manager;
                rec.admin = rec.admin || {};
                delete rec.admin.is;
                delete rec.admin;
                console.log(rec);
              }),
            ))).else( // Not Owner
          iff(context => !context.params.user.admin.is,
            iff(context => !context.params.user.manager.is,
              () => { // Is not Owner, Admin or Manager
                throw new Forbidden('You have insufficient permissions to edit this user');
              }).else( // Is Manager
              keep(
                'coach.qualifications.policeClearance',
                'coach.qualifications.WWC',
                'coach.qualifications.medClearance',
              ),
            )).else( // Is Admin
            keep(
              'region',
              'manager.is',
              'admin.is',
              'coach.is',
              'coach.feedback',
              'coach.qualifications.policeClearance',
              'coach.qualifications.WWC',
              'coach.qualifications.medClearance',
            ),
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
