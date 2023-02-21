const cardService = ({ cardRepository }) => ({
  create: async (data) => cardRepository.create(data),
  update: async (id, data) => cardRepository.update(id, data),
  getAll: async () => cardRepository.getAll(),
  getById: async (id) => cardRepository.getById(id),
  remove: async (id) => cardRepository.remove(id),
});

module.exports = cardService;