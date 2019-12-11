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
  smallOutsideDates,
  smallOutsideRes,
  smallMultiDayDates,
  smallMultiDayRes,
};
