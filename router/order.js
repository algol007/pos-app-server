module.exports = function(app) {
  const controller = require('../controller/order');

  app.post('/api/pos/order', controller.addOrder);
  app.get('/api/pos/order', controller.getAllOrders);
  app.get('/api/pos/order/:orderId', controller.getOrderById);
  app.put('/api/pos/order/:orderId', controller.updateOrder);
  app.delete('/api/pos/admin/order/:orderId', controller.deleteOrder);
};