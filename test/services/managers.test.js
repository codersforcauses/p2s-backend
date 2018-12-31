const app = require('../../src/app');

describe('\'managers\' service', () => {
  it('registered the service', () => {
    const service = app.service('managers');
    expect(service).toBeTruthy();
  });
});
