const createCardModel = ({ sequelize, DataTypes }) => {
  const Card = sequelize.define('Card', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    list: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'cards' // specify the table name
  });

  return Card;
};

module.exports = createCardModel;
