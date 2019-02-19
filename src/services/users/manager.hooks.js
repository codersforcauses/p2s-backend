const { authenticate } = require('@feathersjs/authentication').hooks;
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;
const {
  iff,
  discardQuery,
  alterItems,
  isProvider,
} = require('feathers-hooks-common');
const { omit, pick } = require('lodash');
const { Forbidden } = require('@feathersjs/errors');
const permission = require('../../hooks/permission');
const { limitQuery, isOwner, matchQueryFields } = require('../../hooks/userhooks');

const restrictedFields = ['coach', 'manager', 'admin', 'region', 'email'];

module.exports = {
  before: {
    all: [
      authenticate('jwt'),
      discardQuery('manager', 'coach', 'admin'),
      limitQuery('manager'),
    ],
    find: [permission({ roles: ['manager', 'admin'] })],
    get: [permission({ roles: ['manager', 'admin'] })],
    create: [
      hashPassword(),
      permission({ roles: ['admin'] }),
      alterItems((rec) => {
        delete rec.admin;
        rec.manager = rec.manager || {};
        rec.manager.is = true;
      }),
    ],
    update: [
      hashPassword(), permission({ roles: ['admin', 'manager'] }),
      () => {
        throw new Forbidden('Use patch instead of update.');
      },
    ],
    patch: [
      hashPassword(),
      permission({ roles: ['admin', 'manager'] }),
      iff(isProvider('external'),
        iff(isOwner(),
          iff(context => !context.params.user.admin.is, // Is Owner and manager
            (context) => {
              context.data = omit(context.data, matchQueryFields(context, restrictedFields));
            })).else(
          iff(context => !context.params.user.admin.is, // Not Owner or Admin
            () => {
              throw new Forbidden('You have insufficient permissions to edit this user');
            }).else( // Not Owner is Admin
            (context) => {
              context.data = pick(context.data, matchQueryFields(context, restrictedFields));
            },
          ),
        )),
    ],
    remove: [
      permission({ roles: ['admin'] }),
    ],
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
