const { authenticate } = require('@feathersjs/authentication').hooks;
const { Unprocessable } = require('@feathersjs/errors');
const { iff } = require('feathers-hooks-common');
const permission = require('../../hooks/permission');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [permission({ roles: ['admin', 'manager', 'coach'] })],
    get: [permission({ roles: ['admin', 'manager', 'coach'] })],
    create: [
      permission({ roles: ['admin', 'manager', 'coach'] }),
      iff(context => !context.data.school,
        () => {
          throw new Unprocessable('Student does not have a valid school');
        }),
      iff(!(async (context) => {
        const school = await context.app.service('schools')
          .get(context.data.school, { query: { $select: ['_id'] } });
        if (school) {
          return true;
        }
        return false;
      }),
      () => {
        throw new Unprocessable('School given does not exist');
      }),
    ],
    update: [],
    patch: [permission({ roles: ['admin', 'manager', 'coach'] })],
    remove: [permission({ roles: ['admin'] })],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      context => context.app.service('schools')
        .patch(context.data.school, { $push: { students: context.result._id } })
        .then(() => context),
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
