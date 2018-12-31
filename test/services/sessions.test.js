const app = require('../../src/app');

describe('\'sessions\' service', () => {
  it('registered the service', () => {
    const service = app.service('sessions');
    expect(service).toBeTruthy();
  });
});
