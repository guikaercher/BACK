const toDatabaseFormat = (card) => {
  return {
    id: card.id,
    title: card.title,
    content: card.content,
    list: card.list,
  };
};

const toDomainFormat = (cardData) => {
  return {
    id: cardData.id,
    title: cardData.title,
    content: cardData.content,
    list: cardData.list,
  };
};

const fromTranslatedDomainFormat = (card) => {
  return {
    id: card.id,
    title: card.titulo,
    content: card.conteudo,
    list: card.lista,
  };
};

const toTranslatedDomainFormat = (cardData) => {
  return {
    id: cardData.id,
    titulo: cardData.title,
    conteudo: cardData.content,
    lista: cardData.list,
  };
};

module.exports = {
  toDatabaseFormat,
  toDomainFormat,
  toTranslatedDomainFormat,
  fromTranslatedDomainFormat
};