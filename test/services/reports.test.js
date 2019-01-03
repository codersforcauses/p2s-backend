const app = require('../../src/app');

describe('\'reports\' service', () => {
  it('registered the service', () => {
    const service = app.service('reports');
    expect(service).toBeTruthy();
  });
});
