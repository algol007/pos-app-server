module.exports = function(app) {
  const controller = require('../controller/product');
  const upload = require('../helper/upload');
  
  app.post('/api/pos/admin/product', upload.uploadImage.single('image'), controller.addProduct);
  app.get('/api/pos/product', controller.getAllProducts);
  app.get('/api/pos/product/:productId', controller.getProductById);
  app.put('/api/pos/admin/product/:productId', upload.uploadImage.single('image'), controller.updateProduct);
  app.delete('/api/pos/admin/product/:productId', controller.deleteProduct);
};