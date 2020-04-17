module.exports = function(app) {
  const controller = require('../controller/order_detail');
  const auth = require('../middleware/middleware');

  app.post('/api/pos/orderDetail', auth.authorized, controller.addOrderDetail);
  app.get('/api/pos/orderDetail', controller.getAllOrderDetails);
  app.get('/api/pos/orderDetail/:orderDetailId', controller.getOrderDetailById);
  app.put('/api/pos/orderDetail/:orderDetailId', auth.authorized, controller.updateOrderDetail);
  app.delete('/api/pos/admin/orderDetail/:orderDetailId', auth.authorized, controller.deleteOrderDetail);
};