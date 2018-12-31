const app = require('../../src/app');

describe('\'admins\' service', () => {
  it('registered the service', () => {
    const service = app.service('admins');
    expect(service).toBeTruthy();
  });
});
