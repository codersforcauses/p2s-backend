// const { BadRequest } = require('@feathersjs/errors');

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

/* Data Object
{
 "name": "Term2 2020",
 "school": "5d4808cae3ff8f20c3d2218b",
 "days": [{
    "day": "Thursday",
    "start": "15:00",
    "end": "17:00"
 }],
 "dates": {
    "start": "2020-06-04T00:00:00.000Z",
    "end": "2020-07-16T00:00:00.000Z"
 },
 "coaches": [
    {"_id": "5d48090be3ff8f20c3d221c0"},
    {"_id": "5d4808c8e3ff8f20c3d2217a"},
    {"_id": "5d4808c8e3ff8f20c3d2217d"}
 ]
}
*/

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

// const generateSessionTimes = (startDate, endDate, times) => {

// };

// const autogen = (data) => {
//   const { days, dates } = data;


//   const startDate = new Date(dates.start);
//   const endDate = new Date(dates.end);

//   // // If none of the days provided match the start date return error
//   // let startDay = -1;
//   // days.forEach((day) => {
//   //   if (startDate.getDay() === dayNames.indexOf(day.day)) {
//   //     startDay = startDate.getDay();
//   //   }
//   // });
//   // if (startDay === -1) {
//   //   throw new BadRequest('Start date does not occur on any listed days.');
//   // }


//   const times = [];
//   const durations = [];
//   days.forEach((day) => {
//     // Compares days to start day with range of -6 to 6
//     let dayDifference = dayNames.indexOf(day.day) - startDay;
//     // If the start day is 'After' the subsequent days in the week order
//     // the dayDifference will be negative
//     if (dayDifference < 0) {
//       dayDifference += 7;
//     }
//     // Move forward in time to the specified day and increment by weeks
//     for (
//       let date = startDate.getTime() + dayDifference * oneDay;
//       date <= endDate.getTime();
//       date += oneWeek
//     ) {
//       const timeRegex = /^(?<hour>[0-9]{2}):(?<minute>[0-9]{2})$/;
//       const startTime = day.start.match(timeRegex);
//       const endTime = day.end.match(timeRegex);
//       if (startTime === null || endTime === null) {
//         throw new BadRequest('Time should be formatted HH:MM.');
//       }
//       const dateTime = new Date(date);
//       dateTime.setHours(startTime.groups.hour, startTime.groups.minute);
//       times.push(dateTime.getTime());
//       durations.push(
//         parseInt(endTime.groups.hour, 10)
//         - parseInt(startTime.groups.hour, 10)
//         + (parseInt(endTime.groups.minute, 10)
//         - parseInt(startTime.groups.minute, 10)) / 60,
//       );
//     }
//   });
//   return { times, durations };
// };

/**
   * Autogenerates sessions
   */
const genSessions = () => (context) => {
  const { dates, days } = context.data;
  const startDate = new Date(dates.start);
  const endDate = new Date(dates.end);
  getDatesBetween(startDate, endDate, days[0].day);
  // const { durations, times } = autogen(context.data);
  // const { coaches } = context.data;
  // const service = context.app.service('sessions');
  // const sessionPromises = [];
  // for (let i = 0; i < times.length; i += 1) {
  //   const date = new Date();
  //   date.setTime(times[i]);
  //   sessionPromises.push(
  //     service.create({
  //       date,
  //       duration: durations[i],
  //       coaches,
  //     }),
  //   );
  // }
  // Promise.all(sessionPromises);
};

module.exports = { genSessions, getDatesBetween };
