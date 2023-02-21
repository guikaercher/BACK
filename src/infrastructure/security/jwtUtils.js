const jwtAuth = (authService, jwt) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
          return res.status(401).send('Unauthorized');
        }
      
        const token = authHeader.split(' ')[1];
      
        try {
          const payload = jwt.verify(token, authService.getSecret());
          req.user = payload;
          next();
        } catch (error) {
          console.log(error)
          res.status(401).send('Unauthorized');
        }
    };
  };
  
  module.exports = jwtAuth;
