const app = require('../../src/app');

describe('\'matrix\' service', () => {
  it('registered the service', () => {
    const service = app.service('matrix');
    expect(service).toBeTruthy();
  });
});
