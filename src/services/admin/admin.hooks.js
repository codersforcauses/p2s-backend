const { authenticate } = require('@feathersjs/authentication').hooks;

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [
      context => context.app.service('users').create(context.data)
        .then((user) => {
          context.data.user = user._id;
          return context;
        }),
    ],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [
      async (context) => {
        const promises = context.result.data.map(element => context.app.service('users').get(element.user)
          .then((user) => {
            delete user._id;
            return {
              ...element,
              ...user,
            };
          }));
        const results = await Promise.all(promises);
        context.result.data = results;
        return context;
      },
    ],
    get: [],
    create: [
      context => context.app.service('users')
        .patch(context.data.user, { admin: context.result._id })
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
