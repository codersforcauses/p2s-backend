const app = require('../../src/app');

describe('\'region\' service', () => {
  it('registered the service', () => {
    const service = app.service('region');
    expect(service).toBeTruthy();
  });
});
