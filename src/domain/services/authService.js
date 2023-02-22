const createAuthService = ({ userRepository, jwt }) => {
  const secret = process.env.JWT_SECRET;
  const getSecret = () => secret;

  const authenticate = async (login, password) => {
    const user = await userRepository.findByUsername(login);
    if (!user) {
      return null;
    }
    const isValidPassword = password === user.password;
    if (!isValidPassword) {
      return null;
    }
    const token = jwt.sign({ id: user.id }, getSecret(), { expiresIn: '1h' });
    return token;
  };

  return {
    authenticate,
    getSecret
  };
};

module.exports = createAuthService;
