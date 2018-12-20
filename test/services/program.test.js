const app = require('../../src/app');

describe('\'program\' service', () => {
  it('registered the service', () => {
    const service = app.service('program');
    expect(service).toBeTruthy();
  });
});
