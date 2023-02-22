const { Sequelize, DataTypes } = require('sequelize');
const createCardModel = require('../../../../src/adapters/database/CardSequelizeModel');
const expect = require('chai').expect;

describe('createCardModel', () => {
  let sequelize;

  before(() => {
    sequelize = new Sequelize('sqlite::memory:');
  });

  it('should create a Card model successfully', () => {
    const Card = createCardModel({ sequelize, DataTypes });
    expect(Card.tableName).to.equal('cards');
    expect(Card.rawAttributes).to.have.property('id');
    expect(Card.rawAttributes).to.have.property('title');
    expect(Card.rawAttributes).to.have.property('content');
    expect(Card.rawAttributes).to.have.property('list');
  });

  after(async () => {
    await sequelize.close();
  });
});
