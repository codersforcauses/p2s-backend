const { authenticate } = require('@feathersjs/authentication').hooks;
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;
const {
  iff,
  isProvider,
  preventChanges,
  disallow,
} = require('feathers-hooks-common');
const verifyHooks = require('feathers-authentication-management').hooks;
const permission = require('../../hooks/permission');
const accountService = require('../authmanagement/notifier');


module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [permission({ roles: ['admin'] })],
    get: [permission({ roles: ['admin', 'manager', 'coach'] })],
    create: [hashPassword(), permission({ roles: ['admin'] }), disallow('external'), verifyHooks.addVerification()],
    update: [hashPassword()],
    patch: [
      iff(
        isProvider('external'),
        preventChanges(
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
        hashPassword(),
      ),
      permission({ roles: ['admin'] }),
    ],
    remove: [permission({ roles: ['admin'] })],
  },

  after: {
    all: [
      protect('password'),
    ],
    find: [],
    get: [],
    create: [
      (context) => {
        accountService(context.app).notifier('resendVerifySignup', context.result);
      },
      verifyHooks.removeVerification(),
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
