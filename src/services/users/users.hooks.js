const { authenticate } = require('@feathersjs/authentication').hooks;
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;
const {
  iff,
  some,
  isNot,
  isProvider,
  preventChanges,
  disallow,
} = require('feathers-hooks-common');
const verifyHooks = require('feathers-authentication-management').hooks;
const { verifyRegisterToken, hasVerifyToken, hasAuthentication } = require('../../hooks/userhooks');
const permission = require('../../hooks/permission');
const accountService = require('../authmanagement/notifier');
const { validateSchema } = require('../../hooks/validation/validatehooks');
const { regoSchema } = require('../../hooks/validation/schema/user');
const populateUser = require('../../hooks/population/populate-user');

module.exports = {
  before: {
    all: [],
    find: [
      iff(isProvider('external'),
        iff(isNot(hasVerifyToken()),
          authenticate('jwt'),
          permission({ roles: ['admin'] }))),
    ],
    get: [authenticate('jwt'), permission({ roles: ['admin', 'manager', 'coach'] })],
    create: [
      hashPassword('password'),
      disallow('external'),
    ],
    update: [hashPassword('password')], // Disabled
    patch: [
      iff(
        isProvider('external'),
        hashPassword('password'),
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
        iff(hasAuthentication(),
          authenticate('jwt'),
          permission({ roles: ['admin'] }))
          .else(
            verifyRegisterToken(),
            validateSchema(regoSchema),
          ),
      ),
    ],
    remove: [authenticate('jwt'), permission({ roles: ['admin'] })],
  },

  after: {
    all: [
      populateUser(),
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
