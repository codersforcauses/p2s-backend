// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const error = require('@feathersjs/errors');

module.exports = {
/**
 * Limits querys based on the role
 * @param {String} role Role to limit all querys to
 * @param {Object} context Context object passed from server
 */
  limitQuery: role => (context) => {
    const query = context.params.query || {};

    query[`${role}.is`] = true;

    context.params.query = query;
    return context;
  },
  /**
  * Returns true if the user is the owner of the field they're patching
  * @param {Object} context Context object passed from server
  */
  isOwner: () => (context) => {
    if (context.method === 'create') {
      throw new error.GeneralError('isOwner should not be used in a create hook.');
    }
    const { user } = context.params;
    return context.id === user._id.toString();
  },
};
