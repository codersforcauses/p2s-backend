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
const { limitQuery } = require('../../hooks/userhooks');
const permission = require('../../hooks/permission');
const accountService = require('../authmanagement/notifier');
const { validateSchema } = require('../../hooks/validation/validatehooks');
const { createSchema } = require('../../hooks/validation/schema/user');

module.exports = {
  before: {
    all: [
      authenticate('jwt'),
      permission({ roles: 'admin' }),
      discardQuery('manager', 'coach', 'admin'),
      limitQuery('admin'),
    ],
    find: [],
    get: [],
    create: [
      iff(
        some(isProvider('external'), () => (process.env.NODE_ENV === 'production')),
        validateSchema(createSchema),
        verifyHooks.addVerification(),
      ),
      hashPassword('password'),
      alterItems((rec) => {
        rec.admin = { is: true };
        if (isProvider('external')) {
          delete rec.manager;
        }
      }),
    ],
    update: [hashPassword('password')], // Disabled
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
        hashPassword('password'),
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
      iff(
        some(isProvider('external'), () => (process.env.NODE_ENV === 'production')),
        (context) => {
          accountService(context.app).notifier('resendVerifySignup', context.result);
        },
        verifyHooks.removeVerification(),
      ),
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
