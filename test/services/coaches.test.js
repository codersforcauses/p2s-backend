const app = require('../../src/app');

describe('\'coaches\' service', () => {
  it('registered the service', () => {
    const service = app.service('coaches');
    expect(service).toBeTruthy();
  });
});
