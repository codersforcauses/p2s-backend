const autogenFixturesTest = require("./autogen.fixtures.test");
const { autogen } = require("../../src/hooks/autogen");

it("should work with the correct input", () => {
  const { times, durations } = autogen(autogenFixturesTest);
  expect(times).toBe([]);
  expect(durations).toBe([]);
});
