const createCardController = ({ cardService, cardMapper }) => {
    const create = async (req, res) => {
      try {
        const newCardEntity = cardMapper.fromTranslatedDomainFormat(req.body)
        const card = await cardService.create(newCardEntity);
        return res.status(201).json(cardMapper.toTranslatedDomainFormat(card));
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    };
  
    const update = async (req, res) => {
      try {
        const updatedCard = cardMapper.fromTranslatedDomainFormat(req.body)
        const card = await cardService.update(req.params.id, updatedCard);
        return res.status(200).json(cardMapper.toTranslatedDomainFormat(card));
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    };
  
    const getAll = async (req, res) => {
      try {
        const cards = await cardService.getAll();
        const translatedCards = cards.map(c => cardMapper.toTranslatedDomainFormat(c))
        return res.status(200).json(translatedCards);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    };
  
    const getById = async (req, res) => {
      try {
        const card = await cardService.getById(req.params.id);
        if (!card) {
          return res.status(404).json({ error: 'Card not found' });
        }
        return res.status(200).json(cardMapper.toTranslatedDomainFormat(card));
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    };
  
    const remove = async (req, res) => {
      try {
        await cardService.remove(req.params.id);
        const cardsRemaining = await cardService.getAll();
        const cardsRemainingTranslated = cardsRemaining.map(c => cardMapper.toTranslatedDomainFormat(c))
        return res.status(200).json(cardsRemainingTranslated);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    };
  
    return {
      create,
      update,
      getAll,
      getById,
      remove,
    };
  };
  
  module.exports = createCardController;
  