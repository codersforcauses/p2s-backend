const app = require('../../src/app');

describe('\'stats\' service', () => {
  it('registered the service', () => {
    const service = app.service('stats');
    expect(service).toBeTruthy();
  });
});
