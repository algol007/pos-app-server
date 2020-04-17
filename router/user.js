module.exports = function(app) {
  const controller = require('../controller/user');
  const upload = require('../helper/upload')

  app.post('/api/pos/auth/signup', controller.signUp);
  app.post('/api/pos/auth/signin', controller.signIn);
  app.get('/api/pos/admin/user', controller.getAllUsers);
  app.get('/api/pos/user/:userId', controller.getUserById);
  app.patch('/api/pos/user/activation');
  app.put('/api/pos/user/:userId', upload.uploadImage.single('image'), controller.updateUser);
  app.delete('/api/pos/admin/user/:userId', controller.deleteUser);
};