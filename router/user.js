module.exports = function(app) {
  const controller = require('../controller/user');
  const upload = require('../helper/upload');
  const auth = require('../middleware/middleware');
  const user = require('../middleware/userVerify');

  app.post('/api/pos/auth/signup', user.checkDuplicateEmail, controller.signUp);
  app.post('/api/pos/auth/signin', controller.signIn);
  app.get('/api/pos/admin/user', controller.getAllUsers);
  app.get('/api/pos/user', controller.getAllUsers, controller.checkUsers);
  app.get('/api/pos/user/:userId', controller.getUserById);
  app.patch('/api/pos/user/activation', controller.userActivation);
  app.put('/api/pos/user/:userId', auth.authorized, upload.uploadImage.single('image'), controller.updateUser);
  app.delete('/api/pos/admin/user/:userId', auth.authorized, controller.deleteUser);
};
