const authManagement = require('feathers-authentication-management');
const notifier = require('../../src/services/authmanagement/notifier');
const app = require('../../src/app');

describe('\'authmanagement\' service', () => {
  it('registered the service', () => {
    const configure = app.configure(authManagement(notifier(app)));
    expect(configure).toBeTruthy();
  });
});
