module.exports = function(app) {
  const controller = require('../controller/costumer');

  app.post('/api/pos/costumer', controller.addCostumer);
  app.get('/api/pos/costumer', controller.getAllCostumers);
  app.get('/api/pos/costumer/:costumerId', controller.getCostumerById);
  app.put('/api/pos/costumer/:costumerId', controller.updateCostumer);
  app.delete('/api/pos/admin/costumer/:costumerId', controller.deleteCostumer);
};