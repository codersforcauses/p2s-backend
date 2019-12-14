const { BadRequest } = require('@feathersjs/errors');

const oneDay = 24 * 60 * 60 * 1000;
const oneWeek = oneDay * 7;
const dayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

// Gets the dates of a given day that falls between start and end date
const getDatesBetween = (startDate, endDate, day) => {
  const dates = [];
  let dateIndex = startDate.getTime();
  while (dateIndex <= endDate.getTime()) {
    if (new Date(dateIndex).getDay() === dayNames.indexOf(day)) {
      dates.push(new Date(dateIndex));
      dateIndex += oneWeek;
    } else {
      dateIndex += oneDay;
    }
  }
  return dates;
};

const matchTimeRegex = (start, end) => {
  const timeRegex = /^(?<hour>[0-9]{2}):(?<minute>[0-9]{2})$/;
  const startTime = start.match(timeRegex);
  const endTime = end.match(timeRegex);
  if (startTime === null || endTime === null) {
    throw new BadRequest('Time should be formatted HH:MM.');
  }
  return {
    start: {
      hour: startTime.groups.hour,
      minute: startTime.groups.minute,
    },
    end: {
      hour: endTime.groups.hour,
      minute: endTime.groups.minute,
    },
  };
};

// Times should be an object of hour and minute
const getDuration = (startTime, endTime) => {
  const duration = parseFloat((parseInt(endTime.hour, 10)
  - parseInt(startTime.hour, 10)
  + (parseInt(endTime.minute, 10)
  - parseInt(startTime.minute, 10)) / 60).toFixed(1));
  if (duration < 0) {
    throw new BadRequest('End time is before start time');
  }
  return duration;
};

// Loops through the provided days and gets the dates and
// then sets the times and returns the durations for each
const getDatesAndTimes = (startDate, endDate, daysAndTimes) => daysAndTimes.map((dayAndTimes) => {
  const dates = getDatesBetween(startDate, endDate, dayAndTimes.day);
  const { start, end } = matchTimeRegex(dayAndTimes.start, dayAndTimes.end);
  dates.forEach(date => date.setHours(start.hour, start.minute));
  const duration = getDuration(start, end);
  return { dates, duration };
});

/**
   * Autogenerates sessions
   */
const genSessions = () => (context) => {
  const { dates, days } = context.data;
  const { coaches } = context.data;
  const service = context.app.service('sessions');
  const sessionPromises = [];

  const startDate = new Date(dates.start);
  const endDate = new Date(dates.end);
  const timesAndDates = getDatesAndTimes(startDate, endDate, days);

  timesAndDates.forEach((dayOfWeek) => {
    const { dates: dayDates, duration } = dayOfWeek;
    dayDates.forEach((date) => {
      sessionPromises.push(
        service.create({
          date,
          duration,
          coaches,
        }),
      );
    });
  });
  Promise.all(sessionPromises);
};

module.exports = {
  genSessions, getDatesBetween, getDuration, getDatesAndTimes,
};
