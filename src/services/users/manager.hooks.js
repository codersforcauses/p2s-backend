const { authenticate } = require('@feathersjs/authentication').hooks;
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;
const {
  discardQuery,
  alterItems,
  iff,
  isProvider,
  preventChanges,
} = require('feathers-hooks-common');
const verifyHooks = require('feathers-authentication-management').hooks;
const permission = require('../../hooks/permission');
const { limitQuery } = require('../../hooks/userhooks');
const accountService = require('../authmanagement/notifier');

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
      verifyHooks.addVerification(),
      permission({ roles: ['admin'] }),
      alterItems((rec) => {
        delete rec.admin;
        rec.manager = rec.manager || {};
        rec.manager.is = true;
      }),
    ],
    update: [
      hashPassword(),
      permission({ roles: ['manager', 'admin'] }),
    ],
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
      ),
      hashPassword(),
      authenticate('jwt'),
      permission({ roles: ['manager', 'admin'] }),
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
      (context) => {
        accountService(context.app).notifier('resendVerifySignup', context.result);
      },
      verifyHooks.removeVerification(),
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
