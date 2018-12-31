const app = require('../../src/app');

describe('\'students\' service', () => {
  it('registered the service', () => {
    const service = app.service('students');
    expect(service).toBeTruthy();
  });
});
