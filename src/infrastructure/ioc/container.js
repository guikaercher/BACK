const { createContainer, asFunction, asValue } = require('awilix');
const { Sequelize, DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');

const createUserModel = require('../../adapters/database/UserSequelizeModel');
const createCardModel = require('../../adapters/database/CardSequelizeModel');
const createUserRepository = require('../../adapters/database/UserSequelizeRepository');
const createCardRepository = require('../../adapters/database/CardSequelizeRepository');
const createCardService = require('../../domain/services/cardService');
const createAuthService = require('../../domain/services/authService');
const createAuthController = require('../../adapters/controllers/authController');
const createCardController = require('../../adapters/controllers/cardController');
const { getSecret } = require('../../infrastructure/security/jwtUtils');
const userMapper = require('../../adapters/mappers/userMapper');
const cardMapper = require('../../adapters/mappers/cardMapper');
const bcrypt = require('bcrypt');

const container = createContainer();

container.register({
  sequelize: asValue(new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'root',
    password: 'example',
    database: 'ada-challenge',
  })),
  // Models
  userModel: asFunction(createUserModel).scoped(),
  cardModel: asFunction(createCardModel).scoped(),
  // Repositories
  cardRepository: asFunction(createCardRepository).scoped(),
  userRepository: asFunction(createUserRepository).scoped(),
  // Services
  cardService: asFunction(createCardService).scoped(),
  authService: asFunction(createAuthService).scoped(),
  // Controllers
  authController: asFunction(createAuthController).scoped(),
  cardController: asFunction(createCardController).scoped(),
  // Utils
  jwt: asValue(jwt),
  bcrypt: asValue(bcrypt),
  getSecret: asValue(getSecret),
  // Sequelize DataTypes
  DataTypes: asValue(DataTypes),
  // Mappers
  userMapper: asValue(userMapper),
  cardMapper: asValue(cardMapper)
});

module.exports = container;
