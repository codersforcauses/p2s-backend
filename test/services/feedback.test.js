const app = require('../../src/app');

describe('\'feedback\' service', () => {
  it('registered the service', () => {
    const service = app.service('feedback');
    expect(service).toBeTruthy();
  });
});
