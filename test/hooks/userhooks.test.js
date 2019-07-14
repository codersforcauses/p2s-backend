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
      });

      app.service('verifyToken').hooks({
        before: {
          find: hasVerifyToken(),
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
  });
});
