const { BadRequest } = require('@feathersjs/errors');

module.exports = {
  /**
   * Limits querys based on the role
   * @param {String} role Role to limit all querys to
   * @param {Object} context Context object passed from server
   */
  genSessions: () => (context) => {
    const { days, dates, coaches } = context.data;

    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = oneDay * 7;
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const start = new Date(dates.start);
    const end = new Date(dates.end);

    // If none of the days provided match the start date return error
    let startDay = -1;
    days.forEach((day) => {
      if (start.getDay() === weekDays.indexOf(day.day)) {
        startDay = start.getDay();
      }
    });
    if (startDay === -1) {
      throw new BadRequest('Start date does not occur on any listed days.');
    }

    const times = [];

    days.forEach((day) => {
      // Compares days to start day with range of -6 to 6
      let dayDifference = (weekDays.indexOf(day.day) - startDay);
      // If the start day is "After" the subsequent days in the week order
      // the dayDifference will be negative
      if (dayDifference < 0) {
        dayDifference += 7;
      }
      // Move forward in time to the specified day and increment by weeks
      for (let date = start.getTime() + (dayDifference * oneDay);
        date <= end.getTime();
        date += oneWeek) {
        const startTime = day.start.split(':');
        const dateTime = new Date(date);
        dateTime.setHours(startTime[0], startTime[1]);
        times.push(dateTime.getTime());
      }
    });
    const service = context.app.service('sessions');
    const sessionPromises = [];
    for (let i = 0; i < times.length; i += 1) {
      const date = new Date();
      date.setTime(times[i]);
      sessionPromises.push(
        service.create({
          date,
          coaches,

        }),
      );
    }
    Promise.all(sessionPromises);
  },
};
