module.exports = function(app) {
  const controller = require('../controller/category');

  app.post('/api/pos/admin/category', controller.addCategory);
  app.get('/api/pos/category', controller.getAllCategories);
  app.get('/api/pos/category/:categoryId', controller.getCategoryById);
  app.put('/api/pos/admin/category/:categoryId', controller.updateCategory);
  app.delete('/api/pos/admin/category/:categoryId', controller.deleteCategory);
};