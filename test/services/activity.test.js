const app = require('../../src/app');

describe('\'activities\' service', () => {
  it('registered the service', () => {
    const service = app.service('activities');
    expect(service).toBeTruthy();
  });
});
