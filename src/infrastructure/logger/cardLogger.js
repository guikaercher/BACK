const cardLogger = (req, _res, next) => {
    const { method } = req;
    if (method === 'PUT' || method === 'DELETE') {
      const cardId = req.params.id || req.body.id;
      const cardTitle = req.body.titulo;
      const timestamp = new Date().toLocaleString('pt-BR');
      console.log(`${timestamp} - Card ${cardId} - ${cardTitle} - ${method}`);
    }
    next();
  };
  
  module.exports = cardLogger;
  