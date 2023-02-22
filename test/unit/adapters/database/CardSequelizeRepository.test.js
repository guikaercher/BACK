const { Sequelize, DataTypes } = require('sequelize');
const createCardRepository = require('../../../../src/adapters/database/cardSequelizeRepository');
const expect = require('chai').expect;
const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('Card Repository', () => {
  let sequelize;
  let Card;
  let cardRepository;

  before(async () => {
    sequelize = new Sequelize('sqlite::memory:');
    Card = sequelize.define('Card', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      list: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      tableName: 'cards',
      timestamps: false,
    });
    await Card.sync({ force: true });
    cardRepository = createCardRepository({ cardModel: Card });
  });

  describe('create', () => {
    it('should create a card successfully', async () => {
      const cardData = { title: 'Card 1', content: 'Content 1', list: 'List 1' };
      const createdCard = await cardRepository.create(cardData);

      expect(createdCard).to.have.property('id');
      expect(createdCard).to.have.property('title', cardData.title);
      expect(createdCard).to.have.property('content', cardData.content);
      expect(createdCard).to.have.property('list', cardData.list);
    });
  });

  describe.skip('update', () => {
    it('should update a card successfully', async () => {
      const cardData = { title: 'Card 1', content: 'Content 1', list: 'List 1' };
      const createdCard = await Card.create(cardData, { raw: false });

      const updatedCardData = { id: createdCard.id, title: 'Updated Card 1', content: 'Updated Content 1', list: 'Updated List 1' };
      const updatedCard = await cardRepository.update(updatedCardData);

      expect(updatedCard).to.have.property('id', createdCard.id);
      expect(updatedCard).to.have.property('title', updatedCardData.title);
      expect(updatedCard).to.have.property('content', updatedCardData.content);
      expect(updatedCard).to.have.property('list', updatedCardData.list);
    });

    it('should throw an error when the card is not found', async () => {
      const updatedCardData = { id: 'non-existent-id', title: 'Updated Card 1', content: 'Updated Content 1', list: 'Updated List 1' };
      const updatePromise = cardRepository.update(updatedCardData);

      await expect(updatePromise).to.be.rejectedWith('Card with ID non-existent-id not found');
    });
  });
});