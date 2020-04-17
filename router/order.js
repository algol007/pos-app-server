module.exports = function(app) {
  const controller = require('../controller/order');
  const auth = require('../middleware/middleware');

  app.post('/api/pos/order', auth.authorized, controller.addOrder);
  app.get('/api/pos/order', controller.getAllOrders);
  app.get('/api/pos/order/:orderId', controller.getOrderById);
  app.put('/api/pos/order/:orderId', auth.authorized, controller.updateOrder);
  app.delete('/api/pos/admin/order/:orderId', auth.authorized, controller.deleteOrder);
};