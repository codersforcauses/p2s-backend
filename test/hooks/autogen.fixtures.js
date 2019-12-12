const invalidDates = {
  name: 'Invalid Dates',
  days: [{
    day: 'Wednesday',
    start: '15:00',
    end: '17:00',
  }],
  dates: {
    start: '2019-12-12T00:00:00.000Z',
    end: '2019-12-13T00:00:00.000Z',
  },
};

const invalidRes = [];

const smallDates = {
  name: 'Small Dates',
  days: [{
    day: 'Wednesday',
    start: '15:00',
    end: '17:00',
  }],
  dates: {
    start: '2019-12-11T00:00:00.000Z',
    end: '2019-12-18T00:00:00.000Z',
  },
};

const smallRes = [new Date('2019-12-11T00:00:00.000Z'), new Date('2019-12-18T00:00:00.000Z')];

const smallDatesNTimes = {
  name: 'Small Dates',
  days: [{
    day: 'Wednesday',
    start: '15:00',
    end: '17:00',
  }],
  dates: {
    start: '2019-12-11T00:00:00.000Z',
    end: '2019-12-18T00:00:00.000Z',
  },
};

// Returns as UTC formatted string
const smallDatesNTimesRes = [
  {
    dates: [
      new Date('2019-12-11T07:00:00.000Z'),
      new Date('2019-12-18T07:00:00.000Z'),
    ],
    duration: 2.0,
  }];

const smallOutsideDates = {
  name: 'Small Dates',
  days: [{
    day: 'Wednesday',
    start: '15:00',
    end: '17:00',
  }],
  dates: {
    start: '2019-12-10T00:00:00.000Z',
    end: '2019-12-19T00:00:00.000Z',
  },
};

const smallOutsideRes = [new Date('2019-12-11T00:00:00.000Z'), new Date('2019-12-18T00:00:00.000Z')];

const smallMultiDayDates = {
  name: 'Small Dates',
  days: [{
    day: 'Wednesday',
    start: '15:00',
    end: '17:00',
  },
  {
    day: 'Thursday',
    start: '15:00',
    end: '17:00',
  },
  {
    day: 'Monday',
    start: '15:00',
    end: '17:00',
  }],
  dates: {
    start: '2019-12-11T00:00:00.000Z',
    end: '2019-12-18T00:00:00.000Z',
  },
};

const smallMultiDayRes = [new Date('2019-12-11T00:00:00.000Z'), new Date('2019-12-12T00:00:00.000Z'), new Date('2019-12-16T00:00:00.000Z'), new Date('2019-12-18T00:00:00.000Z')];

module.exports = {
  invalidDates,
  invalidRes,
  smallDates,
  smallRes,
  smallDatesNTimes,
  smallDatesNTimesRes,
  smallOutsideDates,
  smallOutsideRes,
  smallMultiDayDates,
  smallMultiDayRes,
};
