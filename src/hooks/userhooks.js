// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const errors = require('@feathersjs/errors');

module.exports = {
/**
 * Limits querys based on the role
 * @param {String} role Role to limit all querys to
 * @param {Object} context Context object passed from server
 */
  limitQuery: role => (context) => {
    const query = context.params.query || {};

    query[role] = query[role] || {};
    query[role].is = true;

    context.params.query = query;
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
