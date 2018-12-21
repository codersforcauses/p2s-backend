const app = require('../../src/app');

describe('\'admin\' service', () => {
  it('registered the service', () => {
    const service = app.service('admin');
    expect(service).toBeTruthy();
  });
});
