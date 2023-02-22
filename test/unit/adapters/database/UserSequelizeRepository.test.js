const { expect } = require('chai');
const sinon = require('sinon');
const createUserRepository = require('../../../../src/adapters/database/UserSequelizeRepository');

describe('createUserRepository', () => {
  const userModel = {
    create: sinon.stub(),
    findOne: sinon.stub()
  };

  const userMapper = {
    toDomainFormat: sinon.stub(),
    toPersistenceFormat: sinon.stub()
  };

  const userRepository = createUserRepository({ userModel, userMapper });

  describe('createUser', () => {
    it('should create a user successfully', async () => {
      const userData = { login: 'testuser', password: 'password123' };
      const createdUser = { id: '123', ...userData };

      userModel.create.resolves(createdUser);

      const userId = await userRepository.createUser(userData);

      expect(userModel.create).to.have.been.calledWith(userData);
      expect(userId).to.equal(createdUser.id);
    });
  });

  describe('findByUsername', () => {
    it('should return null if no user is found', async () => {
      userModel.findOne.resolves(null);

      const user = await userRepository.findByUsername('nonexistentuser');

      expect(userModel.findOne).to.have.been.calledWith({ where: { login: 'nonexistentuser' } });
      expect(user).to.be.null;
    });

    it.skip('should return a user if found', async () => {
      const foundUser = { id: '123', login: 'founduser', password: 'password123' };

      userModel.findOne.resolves(foundUser);
      userMapper.toDomainFormat.returns(foundUser);

      const user = await userRepository.findByUsername('founduser');

      expect(userModel.findOne).to.have.been.calledWith({ where: { login: 'founduser' } });
      expect(userMapper.toDomainFormat).to.have.been.calledWith(foundUser);
      expect(user).to.deep.equal(foundUser);
    });
  });
});
