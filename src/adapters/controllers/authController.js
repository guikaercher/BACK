const makeAuthController = ({ authService, userMapper }) => {
  const authenticate = async (req, res) => {
    try {
      const { login, password } = userMapper.fromTranslatedDomainFormat(req.body);
      const token = await authService.authenticate(login, password);
      res.status(200).json(token);
    } catch (err) {
      console.log(err)
      res.status(401).json({ message: "Invalid credentials" });
    }
  };

  return {
    authenticate
  };
};

module.exports = makeAuthController;
