const { authenticate } = require('@feathersjs/authentication').hooks;
const { iff, isProvider } = require('feathers-hooks-common');
const { Unprocessable } = require('@feathersjs/errors');
const { populate } = require( 'feathers-hooks-common');

const permission = require('../../hooks/permission');

const populationSchema = {
  include: [
    {
      service: 'students',
      nameAs: 'students',
      parentField: '_id',
      childField: 'school',
    },
    {
      service: 'programs',
      nameAs: 'programs',
      parentField: '_id',
      childField: 'school',
    },
  ],
};


module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [permission({ roles: ['admin', 'manager', 'coach'] })],
    get: [permission({ roles: ['admin', 'manager', 'coach'] })],
    create: [
      permission({ roles: ['admin', 'manager'] }),
      iff(isProvider('external'),
        iff(context => !!context.params.user.region,
          (context) => {
            context.data.region = context.params.user.region;
            return context;
          })),
      iff(context => !context.data.region,
        () => {
          throw new Unprocessable('School does not have a valid region');
        }),
      iff(!(async (context) => {
        const region = await context.app.service('regions')
          .get(context.data.region, { query: { $select: ['_id'] } });
        if (region) {
          return true;
        }
        return false;
      }),
      () => {
        throw new Unprocessable('Region given does not exist');
      }),
    ],
    update: [],
    patch: [permission({ roles: ['admin', 'coach', 'manager'] })],
    remove: [permission({ roles: ['admin', 'manager'] })],
  },

  after: {
    all: [populate({ schema: populationSchema })],
    find: [],
    get: [],
    create: [],
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
