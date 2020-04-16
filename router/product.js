module.exports = function(app) {
  const controller = require('../controller/product');

  app.post('/api/pos/admin/product', controller.addProduct);
  app.get('/api/pos/product', controller.getAllProducts);
  app.get('/api/pos/product/:productId', controller.getProductById);
  app.put('/api/pos/admin/product/:productId', controller.updateProduct);
  app.delete('/api/pos/admin/product/:productId', controller.deleteProduct);
};