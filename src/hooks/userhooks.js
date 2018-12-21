// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = {
  // eslint-disable-next-line no-unused-vars
  /**
   * Adds incoming context to user model
   * @param {Object} context Incoming context from service
   */
  usercreate: (context) => {
    if (context.type === 'before') {
      return context.app.service('users').create(context.data)
        .then((user) => {
          context.data.user = user._id;
          return context;
        });
    } if (context.type === 'after') {
      const data = {};
      data[context.path] = context.result._id;
      return context.app.service('users')
        .patch(context.data.user, data)
        .then(() => context);
    }
    return Promise.reject(new Error('This hook must be as a \'before\' or \'after\''));
  },
  /**
   * Concatenates user data with admin, manager, student or coach data
   * @param {Object} context User id to be matched with relevant data
   */
  userfind: async (context) => {
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
};
