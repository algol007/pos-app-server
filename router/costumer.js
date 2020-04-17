module.exports = function(app) {
  const controller = require('../controller/costumer');
  const auth = require('../middleware/middleware');

  app.post('/api/pos/costumer', auth.authorized, controller.addCostumer);
  app.get('/api/pos/costumer', controller.getAllCostumers);
  app.get('/api/pos/costumer/:costumerId', controller.getCostumerById);
  app.put('/api/pos/costumer/:costumerId', auth.authorized, controller.updateCostumer);
  app.delete('/api/pos/admin/costumer/:costumerId', auth.authorized, controller.deleteCostumer);
};