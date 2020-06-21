const { BadRequest } = require('@feathersjs/errors');
const dayjs = require('dayjs');

const {
  invalidDates,
  invalidRes,
  smallDates,
  smallRes,
  smallDatesNTimes,
  smallDatesNTimesRes,
  bigDatesNTimes,
  bigDatesNTimesRes,
  smallOutsideDates,
  smallOutsideRes,
} = require('./autogen.fixtures');
const {
  getDatesBetween,
  getDuration,
  getDatesAndTimes,
} = require('../../src/hooks/autoGenSessions');

describe('Test getDuration', () => {
  it('should return the correct duration', () => {
    const startTime = { hour: '10', minute: '30' };
    const endTime = { hour: '12', minute: '00' };
    const duration = getDuration(startTime, endTime);
    expect(duration).toBe(1.5);
  });

  it('should return the correct duration for 00:30-13:40', () => {
    const startTime = { hour: '00', minute: '30' };
    const endTime = { hour: '13', minute: '40' };
    const duration = getDuration(startTime, endTime);
    expect(duration).toBe(13.2);
  });

  it('should throw an exception if the end time is before the start time', () => {
    const startTime = { hour: '23', minute: '00' };
    const endTime = { hour: '00', minute: '00' };
    function durationFunction() {
      getDuration(startTime, endTime);
    }
    expect(durationFunction).toThrowError(BadRequest);
  });
});

describe('Test getDatesBetween', () => {
  it('shouldn\'t return anything with invalid input', () => {
    const start = dayjs(invalidDates.dates.start);
    const end = dayjs(invalidDates.dates.end);
    const [{ day }] = invalidDates.days;
    const dates = getDatesBetween(start, end, day);
    expect(dates).toEqual(invalidRes);
  });

  it('returns correct dates for start and finish on specified day', () => {
    const start = dayjs(smallDates.dates.start);
    const end = dayjs(smallDates.dates.end);
    const [{ day }] = smallDates.days;
    const dates = getDatesBetween(start, end, day);
    expect(dates).toEqual(smallRes);
  });

  it('returns correct dates for start and finish before and after specified day', () => {
    const start = dayjs(smallOutsideDates.dates.start);
    const end = dayjs(smallOutsideDates.dates.end);
    const [{ day }] = smallOutsideDates.days;
    const dates = getDatesBetween(start, end, day);
    expect(dates).toEqual(smallOutsideRes);
  });
});

describe('Test getDatesAndTimes', () => {
  it('should return the correct dates and durations', () => {
    const start = dayjs(smallDatesNTimes.dates.start);
    const end = dayjs(smallDatesNTimes.dates.end);
    const { days } = smallDatesNTimes;
    const datesNTimes = getDatesAndTimes(start, end, days);
    expect(datesNTimes).toEqual(smallDatesNTimesRes);
  });

  it('should return the correct dates and durations for multiple days', () => {
    const start = dayjs(bigDatesNTimes.dates.start);
    const end = dayjs(bigDatesNTimes.dates.end);
    const { days } = bigDatesNTimes;
    const datesNTimes = getDatesAndTimes(start, end, days);
    expect(datesNTimes).toEqual(bigDatesNTimesRes);
  });
});
