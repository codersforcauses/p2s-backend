const { GeneralError, NotAuthenticated, Forbidden } = require('@feathersjs/errors');

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
      throw new GeneralError('isOwner should not be used in a create hook.');
    }
    const { user } = context.params;
    return context.id === user._id.toString();
  },
  /**
  * Limits the query to only effect the user
  * matching the provided slug verify token
  * @param {Object} context Context object passed from server
  */
  limitBySlug: () => async (context) => {
    if (context.method !== 'patch') {
      throw new GeneralError('limitBySlug should only be used in a patch hook.');
    }
    if (!context.data.tempAuth) {
      throw new NotAuthenticated('No verify token provided.');
    }
    await context.app.services.users.find({
      query: {
        verifyToken: context.data.tempAuth,
      },
    }).then((user) => {
      if (user.total === 1) {
        if (context.id !== user.data[0]._id.toString()) {
          throw new Forbidden('Verify token provided does not match queried user.');
        }
      } else {
        throw new NotAuthenticated('Invalid verify token provided.');
      }
    });
    return context;
  },
  /**
  * Removes fields from context.data
  * @param {Object} context Context object passed from server
  */
  matchQueryFields: (context, args) => {
    const queryFields = Object.keys(context.data);
    const results = queryFields.filter((field) => {
      const numMatches = args.filter(arg => field.indexOf(arg) >= 0);
      return numMatches.length > 0;
    });
    return results;
  },
};
