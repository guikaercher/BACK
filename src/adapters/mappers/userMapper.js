const toDatabaseFormat = (user) => {
    return {
      id: user.id,
      login: user.login,
      password: user.password,
    };
  };
  
  const toDomainFormat = (userData) => {
    return {
      id: userData.id,
      login: userData.login,
      password: userData.password,
    };
  };

  const fromTranslatedDomainFormat = (user) => {
    return {
      id: user.id,
      login: user.login,
      password: user.senha,
    };
  };

  const toTranslatedDomainFormat = (userData) => {
    return {
      id: userData.id,
      login: userData.login,
      senha: userData.password,
    };
  };
  
  module.exports = {
    toDatabaseFormat,
    toDomainFormat,
    toTranslatedDomainFormat,
    fromTranslatedDomainFormat
  };
  