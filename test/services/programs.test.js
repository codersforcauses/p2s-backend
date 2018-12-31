const app = require('../../src/app');

describe('\'programs\' service', () => {
  it('registered the service', () => {
    const service = app.service('programs');
    expect(service).toBeTruthy();
  });
});
