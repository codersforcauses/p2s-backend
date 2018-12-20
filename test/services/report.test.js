const app = require('../../src/app');

describe('\'report\' service', () => {
  it('registered the service', () => {
    const service = app.service('report');
    expect(service).toBeTruthy();
  });
});
