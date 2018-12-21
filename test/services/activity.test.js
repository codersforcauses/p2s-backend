const app = require('../../src/app');

describe('\'activity\' service', () => {
  it('registered the service', () => {
    const service = app.service('activity');
    expect(service).toBeTruthy();
  });
});
