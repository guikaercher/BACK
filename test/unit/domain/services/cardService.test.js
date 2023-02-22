const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;

chai.use(sinonChai);

const cardService = require('../../../../src/domain/services/cardService');

describe('Card Service', () => {
  let cardRepositoryMock, service;

  beforeEach(() => {
    cardRepositoryMock = {
      create: sinon.stub(),
      update: sinon.stub(),
      getAll: sinon.stub(),
      remove: sinon.stub(),
    };
    service = cardService({ cardRepository: cardRepositoryMock });
  });

  describe('create', () => {
    it('should create a card successfully', async () => {
      const cardData = { title: 'Test Card', content: 'Test Content', list: 'Test List' };
      const expectedCard = { ...cardData, id: 'test-id' };
      cardRepositoryMock.create.resolves(expectedCard);

      const result = await service.create(cardData);

      expect(cardRepositoryMock.create).to.have.been.calledWith(cardData);
      expect(result).to.deep.equal(expectedCard);
    });
  });

  describe('update', () => {
    it('should update a card successfully', async () => {
      const cardData = { id: 'test-id', title: 'Test Card', content: 'Test Content', list: 'Test List' };
      const expectedCard = { ...cardData };
      cardRepositoryMock.update.resolves(expectedCard);

      const result = await service.update(cardData);

      expect(cardRepositoryMock.update).to.have.been.calledWith(cardData);
      expect(result).to.deep.equal(expectedCard);
    });
  });

  describe('getAll', () => {
    it('should get all cards successfully', async () => {
      const expectedCards = [{ id: 'test-id', title: 'Test Card', content: 'Test Content', list: 'Test List' }];
      cardRepositoryMock.getAll.resolves(expectedCards);

      const result = await service.getAll();

      expect(cardRepositoryMock.getAll).to.have.been.called;
      expect(result).to.deep.equal(expectedCards);
    });
  });

  describe('remove', () => {
    it('should remove a card successfully', async () => {
      const cardId = 'test-id';
      cardRepositoryMock.remove.resolves();

      await service.remove(cardId);

      expect(cardRepositoryMock.remove).to.have.been.calledWith(cardId);
    });
  });
});
