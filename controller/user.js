require('dotenv').config();
const Users = require('../models').user;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ErrorHandler } = require('../helper/error');
const sendEmail = require('../helper/sendEmail');

exports.signUp = (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  Users
    .create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, salt),
      role: req.body.role || 'user',
      status: 1,
      image: req.body.image
    })
    .then(data => {
      const token = jwt.sign({
        id: data.id
      }, process.env.SECRET_KEY);
      res.status(201).send({
        user: data,
        message: 'User has been created!'
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, 'Internal server error');
    });
};

exports.signIn = async (req, res, next) => {
  try {
    const user = await Users.findOne({
      where: {
        email: req.body.email
      }
    });
    if (!user) {
      throw new ErrorHandler(403, 'You are not registered! Please signup')
    } else {
      Users
        .findOne({
          where: {
            email: req.body.email
          }
        })
        .then(data => {
          if (data) {
            const authorized = bcrypt.compareSync(
              req.body.password,
              data.password
            );
            if (authorized) {
              const status = data.status;
              if (status == 1) {
                const token = jwt.sign( {
                  id: data.id
                }, process.env.SECRET_KEY );
                res.status(200).send({
                  user: data.id,
                  token: token,
                  message: 'Login Successfuly!'
                });
              } else {
                throw new ErrorHandler(401, 'Please activate your email.')
              }
            } else {
              throw new ErrorHandler(401, 'Wrong password!')
            }
          }
        });
    }
  } catch(error) {
    next(error);
  }
};

exports.getAllUsers = (req, res, next) => {
  Users.findAll()
    .then(data => {
      res.status(200).send({
        users: data
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, 'Internal server error');
    });
};

exports.getUserById = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const user = await Users.findOne({
      where: {
        id: userId
      }
    });
    if (!user) {
      throw new ErrorHandler(404, 'User not found!');
    }
    else {
      Users
        .findOne({
          where: {
            id: userId
          }
        })
        .then(data => {
          // const token = jwt.sign({
          //   id: data.id
          // }, process.env.SECRET_KEY);
          res.status(200).send({
            user: data,
            // token: token
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

exports.userActivation = (req, res, next) => {
  const header = req.query.token;
  if(!header) {
    throw new ErrorHandler(400, 'Anda lupa baca bismillah.');
  } else {
    jwt.verify(header, process.env.SECRET_KEY, (err, decoded) => {
      if(err) {
        throw new ErrorHandler(401, 'Wrong token!');
      } else {
        req.userId = decoded.id;
        console.log(req.userId);
      }
    })
  }
  Users
    .update({
      isActive: 1
    }, {
      where: {
        id: req.userId
      }
    })
    .then(data => {
      res.status(200).send({
        user: data
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, 'Internal server error');
    });
};

exports.updateUser = async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const userId = req.params.userId;

  try {
    const user = await Users.findOne({
      id: userId
    });
    if (!user) {
      throw new ErrorHandler(404, 'User not found!')
    } else {
      Users
        .update({
          name: req.body.name,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, salt),
          role: req.body.role || 'user',
          status: 1,
          image: req.body.image              
        }, {
          where: {
            id: userId
          }
        })
        .then(data => {
          res.status(200).send({
            message: 'User has been updated!',
            user: data
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const user = await Users.findOne({
      where: {
        id: userId
      }
    });
    if (!user) {
      throw new ErrorHandler(404, 'User not found!');
    } else {
      Users
        .destroy({
          where: {
            id: userId
          }
        })
        .then(data => {
          res.status(200).send({
            message: 'User has been deleted!',
            user: data
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

