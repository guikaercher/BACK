const sinon = require('sinon');
const { expect } = require('chai');
const createCardController = require('../../../../src/adapters/controllers/cardController');

describe('Card Controller', () => {
  describe('create method', () => {
    it.skip('should create a new card successfully', async () => {
      const cardService = {
        create: sinon.stub().returns({
          id: 1,
          title: 'Card Title',
          content: 'Card Content',
          list: 'Card List'
        })
      };
      const cardMapper = {
        fromTranslatedDomainFormat: sinon.stub(),
        toTranslatedDomainFormat: sinon.stub()
      };
      cardMapper.fromTranslatedDomainFormat.returns({
        title: 'Card Title',
        content: 'Card Content',
        list: 'Card List'
      });
      cardMapper.toTranslatedDomainFormat.returns({
        id: 1,
        title: 'Card Title',
        content: 'Card Content',
        list: 'Card List'
      });
      const createSpy = sinon.spy(cardService, 'create');
      const req = { body: { title: 'Card Title', content: 'Card Content', list: 'Card List' } };
      const res = { status: sinon.stub().returnsThis(), send: sinon.stub() };
      const controller = createCardController({ cardService, cardMapper });

      await controller.create(req, res);

      expect(createSpy).to.have.been.calledOnceWithExactly({
        title: 'Card Title',
        content: 'Card Content',
        list: 'Card List'
      });
      expect(res.status).to.have.been.calledOnceWithExactly(201);
      expect(res.send).to.have.been.calledOnceWithExactly({
        id: 1,
        title: 'Card Title',
        content: 'Card Content',
        list: 'Card List'
      });
    });

    it('should handle errors thrown by the service', async () => {
      const cardService = {
        create: sinon.stub().throws(new Error('Service error'))
      };
      const cardMapper = {
        fromTranslatedDomainFormat: sinon.stub(),
        toTranslatedDomainFormat: sinon.stub()
      };
      cardMapper.fromTranslatedDomainFormat.returns({
        title: 'Card Title',
        content: 'Card Content',
        list: 'Card List'
      });
      const req = { body: { title: 'Card Title', content: 'Card Content', list: 'Card List' } };
      const res = { status: sinon.stub().returnsThis(), send: sinon.stub() };
      const controller = createCardController({ cardService, cardMapper });

      await controller.create(req, res);

      expect(res.status).to.have.been.calledOnceWithExactly(500);
      expect(res.send).to.have.been.calledOnceWithExactly({ error: 'Service error' });
    });
  });
});