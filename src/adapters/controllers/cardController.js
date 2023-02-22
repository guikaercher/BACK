const createCardController = ({ cardService, cardMapper }) => {
const create = async (req, res) => {
  try {
    const newCardEntity = cardMapper.fromTranslatedDomainFormat(req.body);

    // Check if the card is valid
    if (!newCardEntity.title || !newCardEntity.content || !newCardEntity.list || newCardEntity.id) {
      return res.status(400).send({ error: 'Invalid card data' });
    }

    const card = await cardService.create(newCardEntity);
    return res.status(201).send(cardMapper.toTranslatedDomainFormat(card));
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};


  const update = async (req, res) => {
    try {
      const cardToUpdate = cardMapper.fromTranslatedDomainFormat(req.body)
      
      // Check if the card is valid
      const isIdTheSame = req.params.id === cardToUpdate.id
      if (!cardToUpdate.title || !cardToUpdate.content || !cardToUpdate.list || !isIdTheSame) {
        return res.status(400).send({ error: 'Invalid card data' });
      }
      const card = await cardService.update(cardToUpdate);
      return res.status(200).send(cardMapper.toTranslatedDomainFormat(card));
    } catch (error) {
      console.log(error)
      return res.status(500).send({ error: error.message });
    }
  };

  const getAll = async (req, res) => {
    try {
      const cards = await cardService.getAll();
      const translatedCards = cards.map(c => cardMapper.toTranslatedDomainFormat(c))
      return res.status(200).send(translatedCards);
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  };

  const remove = async (req, res) => {
    try {
      const card = await cardService.getById(req.params.id);
      if (!card) {
        return res.status(404).send({ error: 'Card not found' });
      }
      await cardService.remove(req.params.id);
      const cardsRemaining = await cardService.getAll();
      const cardsRemainingTranslated = cardsRemaining.map(c => cardMapper.toTranslatedDomainFormat(c))
      return res.status(200).send(cardsRemainingTranslated);
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  };

  return {
    create,
    update,
    getAll,
    remove,
  };
};

  
  module.exports = createCardController;
  