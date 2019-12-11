const {
  invalidDates,
  invalidRes,
  smallDates,
  smallRes,
  smallOutsideDates,
  smallOutsideRes,
} = require('./autogen.fixtures');
const { getDatesBetween } = require('../../src/hooks/autogen');

it('shouldn\'t return anything with invalid input', () => {
  const start = new Date(invalidDates.dates.start);
  const end = new Date(invalidDates.dates.end);
  const [{ day }] = invalidDates.days;
  const dates = getDatesBetween(start, end, day);
  expect(dates).toEqual(invalidRes);
});

it('returns correct dates for start and finish on specified day', () => {
  const start = new Date(smallDates.dates.start);
  const end = new Date(smallDates.dates.end);
  const [{ day }] = smallDates.days;
  const dates = getDatesBetween(start, end, day);
  expect(dates).toEqual(smallRes);
});

it('returns correct dates for start and finish before and after specified day', () => {
  const start = new Date(smallOutsideDates.dates.start);
  const end = new Date(smallOutsideDates.dates.end);
  const [{ day }] = smallOutsideDates.days;
  const dates = getDatesBetween(start, end, day);
  expect(dates).toEqual(smallOutsideRes);
});

it('returns correct dates for multiple specified days', () => {
  const start = new Date(smallOutsideDates.dates.start);
  const end = new Date(smallOutsideDates.dates.end);
  const [{ day }] = smallOutsideDates.days;
  const dates = getDatesBetween(start, end, day);
  expect(dates).toEqual(smallOutsideRes);
});
