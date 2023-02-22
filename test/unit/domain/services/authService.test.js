const sinon = require('sinon');
const expect = require('chai').expect;
const createAuthService = require('../../../../src/domain/services/authService');

describe('AuthService', () => {
  describe('authenticate', () => {
    it('should return null when user is not found', async () => {
      const userRepositoryMock = {
        findByUsername: sinon.stub().resolves(null),
      };
      const jwtMock = {
        sign: sinon.stub(),
      };
      const authService = createAuthService({
        userRepository: userRepositoryMock,
        jwt: jwtMock,
        getSecret: () => 'mysecretkey',
      });

      const result = await authService.authenticate('nonexistentuser', 'password');

      expect(result).to.be.null;
      expect(userRepositoryMock.findByUsername).to.have.been.calledOnceWithExactly('nonexistentuser');
      expect(jwtMock.sign).to.not.have.been.called;
    });

    it('should return null when password is invalid', async () => {
      const user = {
        id: '123',
        login: 'testuser',
        password: 'password',
      };
      const userRepositoryMock = {
        findByUsername: sinon.stub().resolves(user),
      };
      const jwtMock = {
        sign: sinon.stub(),
      };
      const authService = createAuthService({
        userRepository: userRepositoryMock,
        jwt: jwtMock,
        getSecret: () => 'mysecretkey',
      });

      const result = await authService.authenticate('testuser', 'invalidpassword');

      expect(result).to.be.null;
      expect(userRepositoryMock.findByUsername).to.have.been.calledOnceWithExactly('testuser');
      expect(jwtMock.sign).to.not.have.been.called;
    });

    it.skip('should return a token when authentication is successful', async () => {
      const user = {
        id: '123',
        login: 'testuser',
        password: 'password',
      };
      const userRepositoryMock = {
        findByUsername: sinon.stub().resolves(user),
      };
      const token = 'abc123';
      const jwtMock = {
        sign: sinon.stub().returns(token),
      };
      const authService = createAuthService({
        userRepository: userRepositoryMock,
        jwt: jwtMock,
        getSecret: () => 'mysecretkey',
      });

      const result = await authService.authenticate('testuser', 'password');

      expect(result).to.equal(token);
      expect(userRepositoryMock.findByUsername).to.have.been.calledOnceWithExactly('testuser');
      expect(jwtMock.sign).to.have.been.calledOnceWithExactly({ id: '123' }, 'mysecretkey', { expiresIn: '1h' });
    });
  });

  describe('getSecret', () => {
    it.skip('should return the secret key', () => {
      const authService = createAuthService({
        getSecret: () => 'mysecretkey',
      });

      const secret = authService.getSecret();

      expect(secret).to.equal('mysecretkey');
    });
  });
});
