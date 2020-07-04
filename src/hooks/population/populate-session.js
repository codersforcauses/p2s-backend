/* eslint-disable require-atomic-updates */
module.exports = (options = {}) => { // eslint-disable-line no-unused-vars
  return async context => {
    const { app, method, result, params } = context;
    const addData = async user => {
      console.log('Populating Session');
      const [students, coaches, reports, feedback, activities] = await Promise.all([
        app.service('students').find(params),
        app.service('reports').find(params),
        app.service('feedback').find(params),
        app.service('activities').find(params)
      ]);
      return {
        ...user,
        coach: {
          ...user.coach,
          students: students.data,
          coaches: coaches.data,
          reports: reports.data,
          feedback: feedback.data,
          activities: activities.data,
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

