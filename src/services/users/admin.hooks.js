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
      hashPassword(),
      iff(
        some(isProvider('external'), () => process.env.NODE_ENV === 'production'),
        verifyHooks.addVerification(),
      ),
      alterItems((rec) => {
        rec.admin = { is: true };
        if (isProvider('external')) {
          delete rec.manager;
        }
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
      iff(
        isProvider('external' || process.env.NODE_ENV === 'production'),
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
