module.exports = function(app) {
  const controller = require('../controller/order_detail');

  app.post('/api/pos/orderDetail', controller.addOrderDetail);
  app.get('/api/pos/orderDetail', controller.getAllOrderDetails);
  app.get('/api/pos/orderDetail/:orderDetailId', controller.getOrderDetailById);
  app.put('/api/pos/orderDetail/:orderDetailId', controller.updateOrderDetail);
  app.delete('/api/pos/admin/orderDetail/:orderDetailId', controller.deleteOrderDetail);
};