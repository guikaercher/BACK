const { Sequelize, DataTypes } = require('sequelize');
const createUserModel = require('../../../../src/adapters/database/UserSequelizeModel');
const expect = require('chai').expect;

describe('createUserModel', () => {
  let sequelize;

  before(() => {
    sequelize = new Sequelize('sqlite::memory:');
  });

  it('should create a User model successfully', () => {
    const User = createUserModel({ sequelize, DataTypes });
    expect(User.tableName).to.equal('users');
    expect(User.rawAttributes).to.have.property('id');
    expect(User.rawAttributes).to.have.property('login');
    expect(User.rawAttributes).to.have.property('password');
  });

  after(async () => {
    await sequelize.close();
  });
});
