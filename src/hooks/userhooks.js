// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const errors = require('@feathersjs/errors');

module.exports = {
  // eslint-disable-next-line no-unused-vars
  /**
   * Hook that enforces the user relation when creating a Student, Manager, Coach, or Admin
   * Creates a user that is linked to this document
   * @param {Object} options Options object for hook
   * @param {Object} context Incoming context from service
   */
  // eslint-disable-next-line no-unused-vars
  usercreate: (options = {}) => (context) => {
    if (context.type === 'before') {
      return context.app
        .service('users')
        .create(context.data)
        .then((user) => {
          context.data.user = user._id;
          return context;
        })
        .catch(() => {
          throw new errors.Conflict('User already exists');
        });
    }
    if (context.type === 'after') {
      const data = {};
      data[context.path] = context.result._id;
      return context.app
        .service('users')
        .patch(context.data.user, data)
        .then(() => context)
        .catch(console.error);
    }
    throw new errors.GeneralError('This hook must be as a \'before\' or \'after\'');
  },
  /**
   * Links user data with admin, manager, student or coach data
   * @param {Object} options Options object for hook
   * @param {Object} context User id to be matched with relevant data
   */
  // eslint-disable-next-line no-unused-vars
  userfind: (options = {}) => async (context) => {
    const promises = context.result.data.map(element => context.app
      .service('users')
      .get(element.user)
      .then((user) => {
        delete user._id;
        return {
          ...element,
          ...user,
        };
      })
      .catch(console.error));
    const results = await Promise.all(promises);
    context.result.data = results;
    return context;
  },
  /**
   * Blocks endpoint from being used by users, and can only be called by the server
   * @param {Object} options Options object for hook
   * @param { String } options.message Displayed error message
   * @param {Object} context Context object passed from server
   */
  userblock: ({ message }) => (context) => {
    if (context.params.provider) {
      throw new errors.MethodNotAllowed(message);
    }
  },
};
