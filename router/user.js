module.exports = function(app) {
  const controller = require('../controller/user');

  app.post('/api/pos/auth/signup', controller.signUp);
  app.post('/api/pos/auth/signin', controller.signIn);
  app.get('/api/pos/admin/user', controller.getAllUsers);
  app.get('/api/pos/user/:userId', controller.getUserById);
  app.patch('/api/pos/user/activation');
  app.put('/api/pos/user/:userId', controller.updateUser);
  app.delete('/api/pos/admin/user/:userId', controller.deleteUser);
};