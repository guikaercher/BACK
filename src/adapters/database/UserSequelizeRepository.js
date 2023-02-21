const createUserRepository = ({ userModel, userMapper }) => {
  const createUser = async (userData) => {
    const { login, password } = userData;
    const user = await userModel.create({ login, password });
    return user.id;
  };

  const findByUsername = async (login) => {
    const user = await userModel.findOne({ where: { login } });
    return user ? userMapper.toDomainFormat(user.get()) : null;
  };

  return {
    createUser,
    findByUsername,
  };
};

module.exports = createUserRepository;
