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
const { Forbidden } = require('@feathersjs/errors');
const verifyHooks = require('feathers-authentication-management').hooks;
const pick = require('lodash/pick');
const omit = require('lodash/omit');
const permission = require('../../hooks/permission');
const accountService = require('../authmanagement/notifier');
const { limitQuery, isOwner, matchQueryFields } = require('../../hooks/userhooks');
const { validateSchema } = require('../../hooks/validation/validatehooks');
const { createSchema } = require('../../hooks/validation/schema/user');

const restrictedFields = ['coach', 'manager', 'admin', 'region', 'email'];

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
      iff(
        some(isProvider('external'), () => (process.env.NODE_ENV === 'production')),
        validateSchema(createSchema),
        verifyHooks.addVerification(),
      ),
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
    update: [hashPassword()], // Disabled
    patch: [
      hashPassword(),
      permission({ roles: ['admin', 'manager', 'coach'] }),
      iff(isProvider('external'),
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
        iff(isOwner(),
          iff(context => !context.params.user.admin.is, // Is Owner not Admin
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
