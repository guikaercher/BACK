const { expect } = require('chai');
const sinon = require('sinon');
const makeAuthController = require('../../../../src/adapters/controllers/authController');

describe('makeAuthController', () => {
  describe('authenticate', () => {
    it('should return a token if authentication is successful', async () => {
      const req = {
        body: {
          login: 'user@example.com',
          password: 'password'
        }
      };
      const token = 'abc123';
      const authService = {
        authenticate: sinon.stub().resolves(token)
      };
      const userMapper = {
        fromTranslatedDomainFormat: sinon.stub().returns({
          login: 'user@example.com',
          password: 'password'
        })
      };
      const res = {
        status: sinon.stub().returns({
          json: sinon.spy()
        })
      };
      const authController = makeAuthController({ authService, userMapper });

      await authController.authenticate(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.status().json.calledWith(token)).to.be.true;
    });

    it('should return an error if authentication fails', async () => {
      const req = {
        body: {
          login: 'user@example.com',
          password: 'password'
        }
      };
      const authService = {
        authenticate: sinon.stub().throws(new Error('Invalid credentials'))
      };
      const userMapper = {
        fromTranslatedDomainFormat: sinon.stub().returns({
          login: 'user@example.com',
          password: 'password'
        })
      };
      const res = {
        status: sinon.stub().returns({
          json: sinon.spy()
        })
      };
      const authController = makeAuthController({ authService, userMapper });

      await authController.authenticate(req, res);

      expect(res.status.calledWith(401)).to.be.true;
      expect(res.status().json.calledWith({ message: 'Invalid credentials' })).to.be.true;
    });
  });
});
