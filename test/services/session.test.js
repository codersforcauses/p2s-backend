const app = require('../../src/app');

describe('\'session\' service', () => {
  it('registered the service', () => {
    const service = app.service('session');
    expect(service).toBeTruthy();
  });
});
