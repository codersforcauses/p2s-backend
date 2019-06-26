const app = require('../../src/app');

describe('\'user\' service', () => {
  it('registered the users service', () => {
    const service = app.service('users');
    expect(service).toBeTruthy();
  });
});

describe('\'admin\' service', () => {
  it('registered the admin service', () => {
    const service = app.service('admin');
    expect(service).toBeTruthy();
  });
});

describe('\'manager\' service', () => {
  it('registered the manager service', () => {
    const service = app.service('manager');
    expect(service).toBeTruthy();
  });
});

describe('\'coach\' service', () => {
  it('registered the coach service', () => {
    const service = app.service('coach');
    expect(service).toBeTruthy();
  });
});
