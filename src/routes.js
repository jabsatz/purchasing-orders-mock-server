const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const categoriesController = require('./controllers/categories');
const ordersController = require('./controllers/orders');

module.exports = function routes(app) {
  app.get('/orders', ordersController.getOrders);
  app.get('/orders/:id', ordersController.getOrder);
  app.post('/orders', ordersController.addOrder);
  app.put('/orders/:id', ordersController.editOrder);
  app.get('/categories', categoriesController.getCategories);
  app.get('/subcategories/:category', categoriesController.getSubCategories);
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
