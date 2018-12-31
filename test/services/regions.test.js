const app = require('../../src/app');

describe('\'regions\' service', () => {
  it('registered the service', () => {
    const service = app.service('regions');
    expect(service).toBeTruthy();
  });
});
