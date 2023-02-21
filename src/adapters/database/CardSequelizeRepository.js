const createCardRepository = ({ cardModel }) => {
    const create = async ({ title, content, list }) => {
      const card = await cardModel.create({ title, content, list });
      return card.toJSON();
    };
  
    const update = async ({ id, title, content, list }) => {
      const [rowsUpdated, [updatedCard]] = await cardModel.update(
        { title, content, list },
        { returning: true, where: { id } }
      );
  
      if (rowsUpdated === 0) {
        throw new Error(`Card with ID ${id} not found`);
      }
  
      return updatedCard.toJSON();
    };
  
    const remove = async (id) => {
      const rowsDeleted = await cardModel.destroy({ where: { id } });
  
      if (rowsDeleted === 0) {
        throw new Error(`Card with ID ${id} not found`);
      }
    };
  
    const getById = async (id) => {
      const card = await cardModel.findByPk(id);
  
      if (!card) {
        return null;
      }
  
      return card.toJSON();
    };
  
    const getAll = async () => {
      const cards = await cardModel.findAll();
      return cards.map((card) => card.toJSON());
    };
  
    return {
      create,
      update,
      remove,
      getById,
      getAll,
    };
  };
  
  module.exports = createCardRepository;