module.exports = function(app) {
  const controller = require('../controller/product');
  const upload = require('../helper/upload');
  const auth = require('../middleware/middleware')

  app.post('/api/pos/admin/product', auth.authorized, upload.uploadImage.single('image'), controller.addProduct);
  app.get('/api/pos/product', controller.getAllProducts);
  app.get('/api/pos/product/:productId', controller.getProductById);
  app.put('/api/pos/admin/product/:productId', auth.authorized, upload.uploadImage.single('image'),
  controller.updateProduct);
  app.delete('/api/pos/admin/product/:productId', auth.authorized, controller.deleteProduct);
};
