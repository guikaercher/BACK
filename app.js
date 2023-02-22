const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { scopePerRequest } = require('awilix-express');
const container = require('./src/infrastructure/ioc/container.js');
const jwtAuth = require('./src/infrastructure/security/jwtUtils.js');
const cardLogger = require('./src/infrastructure/logger/cardLogger');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(scopePerRequest(container));
app.use(cardLogger);
const jwtLoginMiddleware = jwtAuth(container.resolve('authService'), container.resolve('jwt'))

// Routes
const router = express.Router();
// Auth routes
router.post('/login', container.resolve('authController').authenticate);
// Card routes
router.get('/cards', jwtLoginMiddleware, container.resolve('cardController').getAll);
router.post('/cards', jwtLoginMiddleware, container.resolve('cardController').create);
router.put('/cards/:id', jwtLoginMiddleware, container.resolve('cardController').update);
router.delete('/cards/:id', jwtLoginMiddleware, container.resolve('cardController').remove);
app.use(router)

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
