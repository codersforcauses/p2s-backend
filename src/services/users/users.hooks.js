const { authenticate } = require('@feathersjs/authentication').hooks;

const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;

const {
  disallow,
  iff,
  isProvider,
  preventChanges,
} = require('feathers-hooks-common');

const verifyHooks = require('feathers-authentication-management').hooks;

const permission = require('../../hooks/permission');

const accountService = require('../authmanagement/notifier');


module.exports = {
  before: {
    all: [authenticate('jwt'), permission({ roles: 'admin' })],
    find: [],
    get: [],
    create: [disallow('external'), hashPassword(), verifyHooks.addVerification()],
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
        authenticate('jwt'),
      ),
    ],
    remove: [],
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
