const app = require('../../src/app');

describe('\'manager\' service', () => {
  it('registered the service', () => {
    const service = app.service('manager');
    expect(service).toBeTruthy();
  });
});
