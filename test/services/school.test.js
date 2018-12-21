const app = require('../../src/app');

describe('\'school\' service', () => {
  it('registered the service', () => {
    const service = app.service('school');
    expect(service).toBeTruthy();
  });
});
