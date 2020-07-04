/* eslint-disable require-atomic-updates */
module.exports = (options = {}) => { // eslint-disable-line no-unused-vars
  return async context => {
    const { app, method, result, params } = context;
    const addData = async user => {
      console.log('Populating Session');
      const [sessions, feedback] = await Promise.all([
        app.service('sessions').find(params),
        app.service('feedback').find(params)
      ]);
      return {
        ...user,
        coach: {
          ...user.coach,
          sessions: sessions.data,
          feedback: feedback.data
        }
      };
    };

    if (method === 'find') {
      context.result.data = await Promise.all(result.data.map(addData));
    } else {
      context.result = await addData(result);
    }

    return context;
  };
};

