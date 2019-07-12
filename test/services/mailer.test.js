const app = require('../../src/app');

describe('\'mailer\' service', () => {
  it('registered the service', () => {
    const service = app.service('mailer');
    expect(service).toBeTruthy();
  });
});
