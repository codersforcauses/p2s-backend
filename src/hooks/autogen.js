const { BadRequest } = require('@feathersjs/errors');

const autogen = (data) => {
  const { days, dates } = data;

  const oneDay = 24 * 60 * 60 * 1000;
  const oneWeek = oneDay * 7;
  const weekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

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
  const durations = [];
  days.forEach((day) => {
    // Compares days to start day with range of -6 to 6
    let dayDifference = weekDays.indexOf(day.day) - startDay;
    // If the start day is 'After' the subsequent days in the week order
    // the dayDifference will be negative
    if (dayDifference < 0) {
      dayDifference += 7;
    }
    // Move forward in time to the specified day and increment by weeks
    for (
      let date = start.getTime() + dayDifference * oneDay;
      date <= end.getTime();
      date += oneWeek
    ) {
      const timeRegex = /^(?<hour>[0-9]{2}):(?<minute>[0-9]{2})$/;
      const startTime = day.start.match(timeRegex);
      const endTime = day.end.match(timeRegex);
      if (startTime === null || endTime === null) {
        throw new BadRequest('Time should be formatted HH:MM.');
      }
      const dateTime = new Date(date);
      dateTime.setHours(startTime.groups.hour, startTime.groups.minute);
      times.push(dateTime.getTime());
      durations.push(
        parseInt(endTime.groups.hour, 10)
        - parseInt(startTime.groups.hour, 10)
        + (parseInt(endTime.groups.minute, 10)
        - parseInt(startTime.groups.minute, 10)) / 60,
      );
    }
  });
  return { times, durations };
};

module.exports = {
  /**
   * Autogenerates sessions
   */
  genSessions: () => (context) => {
    const { durations, times } = autogen(context.data);
    const { coaches } = context.data;
    const service = context.app.service('sessions');
    const sessionPromises = [];
    for (let i = 0; i < times.length; i += 1) {
      const date = new Date();
      date.setTime(times[i]);
      sessionPromises.push(
        service.create({
          date,
          duration: durations[i],
          coaches,
        }),
      );
    }
    Promise.all(sessionPromises);
  },
};
