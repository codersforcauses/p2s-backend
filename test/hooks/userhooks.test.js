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
      const contextAll = {
        method: 'all',
        params: {
          query: {
            verifyToken: '12345',
          },
        },
      };
      const contextGet = {
        method: 'get',
        params: {
          query: {
            verifyToken: '12345',
          },
        },
      };
      const contextCreate = {
        method: 'create',
        params: {
          query: {
            verifyToken: '12345',
          },
        },
      };
      const contextUpdate = {
        method: 'update',
        params: {
          query: {
            verifyToken: '12345',
          },
        },
      };
      const contextPatch = {
        method: 'patch',
        params: {
          query: {
            verifyToken: '12345',
          },
        },
      };
      const contextRemove = {
        method: 'remove',
        params: {
          query: {
            verifyToken: '12345',
          },
        },
      };
      expect.assertions(6);

      try {
        await hasVerifyToken()(contextAll);
      } catch (error) {
        expect(error.name).toBe('GeneralError');
      }

      try {
        await hasVerifyToken()(contextGet);
      } catch (error) {
        expect(error.name).toBe('GeneralError');
      }

      try {
        await hasVerifyToken()(contextCreate);
      } catch (error) {
        expect(error.name).toBe('GeneralError');
      }

      try {
        await hasVerifyToken()(contextUpdate);
      } catch (error) {
        expect(error.name).toBe('GeneralError');
      }

      try {
        await hasVerifyToken()(contextPatch);
      } catch (error) {
        expect(error.name).toBe('GeneralError');
      }

      try {
        await hasVerifyToken()(contextRemove);
      } catch (error) {
        expect(error.name).toBe('GeneralError');
      }
    });
  });
});
