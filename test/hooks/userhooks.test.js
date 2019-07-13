const feathers = require('@feathersjs/feathers');

const {
  hasVerifyToken,
} = require('../../src/hooks/userhooks');

describe('\'userhooks\' hook', () => {
  describe('verifyToken', () => {
    let app;
    beforeEach(() => {
      app = feathers();
      app.use('/verifyToken', {
        async find(context) {
          return context;
        },
        async get(context) {
          return context;
        },
      });

      app.service('verifyToken').hooks({
        before: {
          find: hasVerifyToken(),
          get: hasVerifyToken(),
        },
      });
    });

    it('Should return true for a present verifyToken', async () => {
      const params = {
        query: {
          verifyToken: '12345',
        },
      };
      const result = await app.service('verifyToken').find(params);
      expect.assertions(1);
      expect(result).toBeTruthy();
    });

    it('Should error on undefined token', async () => {
      const params = {
        query: {
          test: '12345',
        },
      };
      const result = await app.service('verifyToken').find(params);
      expect.assertions(1);
      expect(result).toBeFalsy();
    });

    it('Should error if called from get', async () => {
      const params = {
        query: {
          test: '12345',
        },
      };
      const result = await app.service('verifyToken').get(params);
      expect.assertions(1);
      expect(result.name).toBe('NotFound');
    });
  });
});
