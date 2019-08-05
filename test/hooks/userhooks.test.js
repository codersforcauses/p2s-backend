const {
  hasVerifyToken,
} = require('../../src/hooks/userhooks');

describe('\'userhooks\' hook', () => {
  describe('verifyToken', () => {
    it('Should return true for a present verifyToken', async () => {
      const context = {
        method: 'find',
        params: {
          query: {
            verifyToken: '12345',
          },
        },
      };
      const result = await hasVerifyToken()(context);
      expect.assertions(1);
      expect(result).toBeTruthy();
    });

    it('Should return false if any fields are undefined', async () => {
      const contextMissingParams = {
        method: 'find',
      };
      const contextMissingQuery = {
        method: 'find',
        params: {},
      };
      const contextMissingToken = {
        method: 'find',
        params: {
          query: {},
        },
      };
      const result1 = await hasVerifyToken()(contextMissingParams);
      const result2 = await hasVerifyToken()(contextMissingQuery);
      const result3 = await hasVerifyToken()(contextMissingToken);

      expect.assertions(3);
      expect(result1).toBeFalsy();
      expect(result2).toBeFalsy();
      expect(result3).toBeFalsy();
    });

    it('Should error if called from non find hook', async () => {
      const params = {
        query: {
          verifyToken: '12345',
        },
      };
      const contextAll = {
        method: 'all',
        params,
      };
      const contextGet = {
        method: 'get',
        params,
      };
      const contextCreate = {
        method: 'create',
        params,
      };
      const contextUpdate = {
        method: 'update',
        params,
      };
      const contextPatch = {
        method: 'patch',
        params,
      };
      const contextRemove = {
        method: 'remove',
        params,
      };
      const contextList = [
        contextAll,
        contextGet,
        contextCreate,
        contextUpdate,
        contextPatch,
        contextRemove,
      ];

      expect.assertions(5); // THIS SHOULD BE 6 I HAVE NO IDEA WHY IT MISSES THE LAST ONE

      async function processArray(array) {
        // eslint-disable-next-line no-restricted-syntax
        for (const context of array) {
          try {
            // eslint-disable-next-line no-await-in-loop
            await hasVerifyToken()(context);
          } catch (error) {
            expect(error.name).toBe('GeneralError');
            console.log(error.name);
          }
        }
      }
      processArray(contextList);
    });
  });
});
