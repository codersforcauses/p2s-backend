const { authenticate } = require('@feathersjs/authentication').hooks;
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;
const { discardQuery, alterItems, iff } = require('feathers-hooks-common');

const permission = require('../../hooks/permission');
const { limitQuery } = require('../../hooks/userhooks');

module.exports = {
  before: {
    all: [
      authenticate('jwt'),
      permission({ roles: ['manager', 'admin'] }),
      discardQuery('manager', 'coach', 'admin'),
      limitQuery('manager'),
    ],
    find: [],
    get: [],
    create: [
      hashPassword(),
      alterItems((rec) => {
        delete rec.admin;
        rec.manager = rec.manager || {};
        rec.manager.is = true;
      }),
    ],
    update: [hashPassword()],
    patch: [hashPassword()],
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
