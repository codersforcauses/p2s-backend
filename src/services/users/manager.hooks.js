const { authenticate } = require('@feathersjs/authentication').hooks;
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;
const {
  discardQuery,
  alterItems,
  iff,
  some,
  isProvider,
  preventChanges,
} = require('feathers-hooks-common');
const verifyHooks = require('feathers-authentication-management').hooks;
const { omit, pick } = require('lodash');
const { Forbidden } = require('@feathersjs/errors');
const permission = require('../../hooks/permission');
const accountService = require('../authmanagement/notifier');
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
      iff(
        some(isProvider('external'), () => (process.env.NODE_ENV === 'production')),
        verifyHooks.addVerification(),
      ),
      permission({ roles: ['admin'] }),
      alterItems((rec) => {
        delete rec.admin;
        rec.manager = rec.manager || {};
        rec.manager.is = true;
      }),
    ],
    update: [hashPassword()], // Disabled
    patch: [
      iff(
        isProvider('external'),
        preventChanges(
          true,
          'email',
          'isVerified',
          'verifyToken',
          'verifyShortToken',
          'verifyExpires',
          'verifyChanges',
          'resetToken',
          'resetShortToken',
          'resetExpires',
        ),
      ),
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
      iff(
        some(isProvider('external'), () => (process.env.NODE_ENV === 'production')),
        (context) => {
          accountService(context.app).notifier('resendVerifySignup', context.result);
        },
        verifyHooks.removeVerification(),
      ),
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
